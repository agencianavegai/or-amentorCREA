import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database.types'

export type CompositionItem = Database['public']['Tables']['compositions']['Row']

/**
 * Busca composições na base de dados Supabase (Search as You Type)
 * Usa .textSearch ou .ilike em 'description' e 'code'. Limite de 20 para velocidade.
 */
export async function searchCompositions(query: string, baseIds?: string[]): Promise<CompositionItem[]> {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  )

  let request = supabase
    .from('compositions')
    .select('*')

  if (query && query.length >= 2) {
    request = request.or(`description.ilike.%${query}%,code.ilike.%${query}%`)
  }

  if (baseIds && baseIds.length > 0) {
    request = request.in('base_id', baseIds)
  }

  const { data, error } = await request.limit(20)

  if (error) {
    console.error('Erro na busca de composições:', error)
    return []
  }

  return data || []
}

/**
 * Busca insumos associados a uma composição, agrupados por MÃO DE OBRA, MATERIAL ou EQUIPAMENTO.
 */
export async function fetchCompositionDetails(compositionId: string) {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  )

  const { data, error } = await supabase
    .from('composition_inputs')
    .select(`
      id,
      coefficient,
      inputs (
        id,
        code,
        description,
        unit,
        unit_price,
        type
      )
    `)
    .eq('composition_id', compositionId)

  if (error) {
    console.error('Erro ao buscar detalhamento da composição:', error)
    return { data: [], error }
  }

  // A query acima retorna joins aninhados.
  // Transformaremos o response mapeando 'inputs' para o primeiro nível na resposta visual:
  // (Nota: inputs pode ser Array devido a relacao muitos-para-um do lado de insumos se for incorreta a tipagem, mas tipicamente é object).
  const formatted = (data || []).map(ci => {
    const input = Array.isArray(ci.inputs) ? ci.inputs[0] : ci.inputs
    return {
      id: ci.id,
      coefficient: ci.coefficient,
      input: input,
    }
  })

  return { data: formatted, error: null }
}
