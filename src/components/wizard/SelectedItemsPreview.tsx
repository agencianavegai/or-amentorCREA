import React from 'react'
import { Badge } from '../ui/Badge'
import { Trash2 } from 'lucide-react'

export interface SelectedItem {
  composicaoId: string
  code: string
  descricao: string
  unidade: string
  quantidade: number
  custoUnitario: number
  fonteBase?: string
}

interface SelectedItemsPreviewProps {
  items: SelectedItem[]
  onRemove: (index: number) => void
}

export function SelectedItemsPreview({ items, onRemove }: SelectedItemsPreviewProps) {
  if (items.length === 0) {
    return null
  }

  const getBadgeVariant = (fonte?: string) => {
    if (!fonte) return 'default'
    const lowerFonte = fonte.toLowerCase()
    if (lowerFonte.includes('sinapi')) return 'sinapi'
    if (lowerFonte.includes('sicro')) return 'sicro'
    return 'default'
  }

  return (
    <div className="bg-white rounded-lg border border-crea-gray-200 shadow-sm overflow-hidden mb-6">
      <div className="bg-crea-gray-50 px-4 py-3 border-b border-crea-gray-200 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-crea-blue-900">
          Insumos/Composições Selecionados ({items.length})
        </h3>
      </div>
      <div className="max-h-60 overflow-y-auto p-4 space-y-3">
        {items.map((item, index) => (
          <div 
            key={`${item.composicaoId}-${index}`} 
            className="flex items-start justify-between bg-white border border-crea-gray-200 p-3 rounded-md hover:border-crea-blue-300 transition-colors"
          >
            <div className="flex flex-col gap-1 pr-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-gray-500">{item.code}</span>
                <Badge variant={getBadgeVariant(item.fonteBase)}>
                  {item.fonteBase || 'N/A'}
                </Badge>
              </div>
              <p className="text-sm text-gray-700 font-medium line-clamp-2" title={item.descricao}>
                {item.descricao}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              title="Remover item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
