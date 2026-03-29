/**
 * IDs das bases de referência no Supabase.
 * Centralizado para evitar erros de digitação e facilitar manutenção.
 */
export const BASE_IDS = {
  SINAPI: '434bd8c9-d59e-411f-beab-2a2e681b809e',
  SICRO: '3a3498c8-82a3-485a-bb09-0edef36e1819'
} as const;

export type BaseType = keyof typeof BASE_IDS;
