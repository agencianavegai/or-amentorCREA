import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database.types'

export type CompositionItem = Database['public']['Tables']['compositions']['Row']

/**
 * Busca composições na base de dados Supabase (Search as You Type)
 * Usa .textSearch ou .ilike em 'description' e 'code'. Limite de 20 para velocidade.
 */
export async function searchCompositions(query: string, baseId?: string): Promise<CompositionItem[]> {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  )

  if (!query || query.length < 2) return []

  let request = supabase
    .from('compositions')
    .select('*')
    // Usando or() para buscar no código ou na descrição usando ilike
    .or(`description.ilike.%${query}%,code.ilike.%${query}%`)
    
  if (baseId) {
    request = request.eq('base_id', baseId)
  }

  const { data, error } = await request.limit(20)

  if (error) {
    console.error('Erro na busca de composições:', error)
    return []
  }

  return data || []
}
