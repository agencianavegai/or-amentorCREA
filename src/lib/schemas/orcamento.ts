import { z } from "zod"

// ---------- Etapa 1: Setup do Projeto ----------
export const setupSchema = z.object({
  nomeProfissional: z.string().min(3, "Nome do profissional deve ter ao menos 3 caracteres"),
  registroCrea: z.string().min(5, "CREA inválido"),
  nomeObra: z.string().min(3, "Nome da obra deve ter ao menos 3 caracteres"),
  descricaoObra: z.string().optional(),
  cliente: z.string().min(2, "Nome do cliente é obrigatório"),
  documentoCliente: z.string().min(11, "CPF/CNPJ inválido"),
  baseReferencia: z.enum(["sinapi", "sicro"]),
  mesReferencia: z.string().optional(),
  isDesonerado: z.boolean().default(false),
})

// ---------- Etapa 2: Busca por IA ----------
export const buscaSchema = z.object({
  descricaoServico: z.string().min(5, "Descreva o serviço com mais detalhes"),
})

// ---------- Etapa 3: Quantitativos ----------
export const quantitativoItemSchema = z.object({
  composicaoId: z.string(),
  descricao: z.string(),
  unidade: z.string(),
  quantidade: z.number().positive("Quantidade deve ser maior que zero"),
  custoUnitario: z.number().nonnegative(),
})

export const quantitativosSchema = z.object({
  itens: z.array(quantitativoItemSchema).min(1, "Adicione ao menos um item"),
})

// ---------- Etapa 4: Custo Direto ----------
export const custoDiretoSchema = z.object({
  itensConfirmados: z.boolean().default(false),
})

// ---------- Etapa 5: BDI ----------
export const bdiSchema = z.object({
  administracaoCentral: z.number().min(0).max(100).default(4),
  seguroGarantia: z.number().min(0).max(100).default(0.8),
  riscos: z.number().min(0).max(100).default(1.27),
  despesasFinanceiras: z.number().min(0).max(100).default(1.23),
  lucro: z.number().min(0).max(100).default(7.4),
  tributosPis: z.number().min(0).max(100).default(0.65),
  tributosCofins: z.number().min(0).max(100).default(3),
  tributosIss: z.number().min(0).max(100).default(2),
})

// ---------- Etapa 6: Resumo ----------
export const resumoSchema = z.object({
  observacoes: z.string().optional(),
})

// ---------- Schema completo do Wizard ----------
export const orcamentoWizardSchema = z.object({
  setup: setupSchema,
  busca: buscaSchema,
  quantitativos: quantitativosSchema,
  custoDireto: custoDiretoSchema,
  bdi: bdiSchema,
  resumo: resumoSchema,
})

export type OrcamentoWizardData = z.infer<typeof orcamentoWizardSchema>
export type SetupData = z.infer<typeof setupSchema>
export type BuscaData = z.infer<typeof buscaSchema>
export type QuantitativosData = z.infer<typeof quantitativosSchema>
export type QuantitativoItem = z.infer<typeof quantitativoItemSchema>
export type CustoDiretoData = z.infer<typeof custoDiretoSchema>
export type BdiData = z.infer<typeof bdiSchema>
export type ResumoData = z.infer<typeof resumoSchema>
