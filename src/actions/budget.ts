"use server"

import { createClient } from "@supabase/supabase-js"
import { OrcamentoWizardData } from "@/lib/schemas/orcamento"

export type SaveBudgetResult = {
  success: boolean
  budgetId?: string
  error?: string
}

export async function saveBudget(data: OrcamentoWizardData): Promise<SaveBudgetResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    return { success: false, error: "Supabase configurado incorretamente nas variáveis de ambiente." }
  }

  // Bypass RLS usando Service Role
  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    // 1. Encontrar ou criar o Guest User
    const { data: users, error: errUsers } = await supabase
      .from('users')
      .select('id')
      .eq('email', 'guest@engia-crea.app')
      .limit(1)

    let guestId: string
    if (errUsers || !users || users.length === 0) {
      const { data: newGuest, error: errNewGuest } = await supabase
        .from('users')
        .insert([{ 
          email: 'guest@engia-crea.app', 
          full_name: data.setup.nomeProfissional || 'Usuário Convidado (Sistema)',
          crea_registration: data.setup.registroCrea
        }])
        .select('id')
        .single()
      
      if (errNewGuest || !newGuest) {
        throw new Error("Erro ao criar usuário guest de sistema: " + errNewGuest?.message)
      }
      guestId = newGuest.id
    } else {
      guestId = users[0].id
      await supabase.from('users').update({
        full_name: data.setup.nomeProfissional || 'Usuário Convidado (Sistema)',
        crea_registration: data.setup.registroCrea
      }).eq('id', guestId)
    }

    const baseNamesConcat = (data.setup.basesReferencia || []).join(' + ') || 'SINAPI'
    // 2. Encontrar ou criar a Base de Referência
    const { data: bases, error: errBases } = await supabase
      .from('reference_bases')
      .select('id')
      .ilike('name', `%${baseNamesConcat}%`)
      .limit(1)
      
    let baseId: string
    if (errBases || !bases || bases.length === 0) {
      // Cria mock caso nao encontre
      const { data: newBase, error: errNewBase } = await supabase
        .from('reference_bases')
        .insert([{ name: baseNamesConcat.toUpperCase() }])
        .select('id')
        .single()
      
      if (errNewBase || !newBase) throw new Error("Erro ao criar base de referência.")
      baseId = newBase.id
    } else {
      baseId = bases[0].id
    }

    // 3. Cadastrar Project
    const { data: project, error: errProj } = await supabase
      .from('projects')
      .insert([{
        user_id: guestId,
        name: data.setup.nomeObra || "Orçamento Sem Nome",
        description: data.setup.descricaoObra || null,
        client_name: data.setup.cliente || "Cliente Não Informado",
        client_document: data.setup.documentoCliente
      }])
      .select('id')
      .single()

    if (errProj || !project) throw new Error("Erro ao salvar o Projeto: " + errProj?.message)

    // 4. Cadastrar Budget Header
    const totalItens = data.quantitativos.itens.map(item => (item.quantidade || 0) * (item.custoUnitario || 0))
    const subtotal = totalItens.reduce((acc, curr) => acc + curr, 0)
    
    // Calcula BDI
    const bdiAdministracao = data.bdi?.administracaoCentral || 4.0
    const bdiLucro = data.bdi?.lucro || 7.4
    const bdiTributos = 5.65 // Mocado por enquanto, ou do estado
    const bdiGlobalPercent = bdiAdministracao + bdiLucro + bdiTributos
    const totalBdiValue = subtotal * (bdiGlobalPercent / 100)
    const totalSalePrice = subtotal + totalBdiValue

    const { data: budget, error: errBudget } = await supabase
      .from('budgets')
      .insert([{
        project_id: project.id,
        base_id: baseId,
        status: 'FINALIZADO',
        total_direct_cost: subtotal,
        total_bdi_value: totalBdiValue,
        total_sale_price: totalSalePrice,
        is_desonerated: data.setup.isDesonerado
      }])
      .select('id')
      .single()

    if (errBudget || !budget) throw new Error("Erro ao salvar cabeçalho do orçamento: " + errBudget?.message)

    // 5. Cadastrar Budget Items em Lote (Bulk Insert)
    const budgetItemsToInsert = data.quantitativos.itens.map((item, index) => {
      const quantity = item.quantidade || 0
      const cost = item.custoUnitario || 0
      return {
        budget_id: budget.id,
        composition_id: item.composicaoId, // Assumindo q composicaoId seja o UUID oficial do db gravado
        quantity: quantity,
        unit_cost: cost,
        total_cost: quantity * cost,
        sort_order: index
      }
    })

    if (budgetItemsToInsert.length > 0) {
      const { error: errItems } = await supabase
        .from('budget_items')
        .insert(budgetItemsToInsert)
      
      if (errItems) throw new Error("Erro ao salvar os itens do orçamento: " + errItems.message)
    }

    // 6. Cadastrar BDI Configs
    const { error: errBdi } = await supabase
      .from('bdi_configs')
      .insert([{
        budget_id: budget.id,
        admin_rate: bdiAdministracao,
        profit_rate: bdiLucro,
        tax_rate: bdiTributos,
        total_bdi_percent: bdiGlobalPercent
      }])
    
    if (errBdi) throw new Error("Erro ao salvar config do BDI: " + errBdi.message)

    return { success: true, budgetId: budget.id }
    
  } catch (error: unknown) {
    console.error("[saveBudget Action Error]: ", error)
    const message = error instanceof Error ? error.message : "Ocorreu um erro desconhecido ao salvar base de dados."
    return { success: false, error: message }
  }
}
