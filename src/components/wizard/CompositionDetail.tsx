'use client'

import React, { useEffect, useState } from 'react'
import { fetchCompositionDetails } from '@/services/compositions'
import { Loader2, Zap, Package, Wrench } from 'lucide-react'

interface CompositionDetailProps {
  compositionId: string
}

type InputData = {
  id: string
  coefficient: number
  input: {
    id: string
    code: string | null
    description: string
    unit: string | null
    unit_price: number | null
    type: string | null
  }
}

export function CompositionDetail({ compositionId }: CompositionDetailProps) {
  const [data, setData] = useState<InputData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const { data: details } = await fetchCompositionDetails(compositionId)
        // Ignoring error for now, just setting data
        setData(details as unknown as InputData[])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [compositionId])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-6 space-y-3 bg-gray-50 rounded-md border border-gray-100 animate-pulse">
        <Loader2 className="w-6 h-6 animate-spin text-crea-blue-400" />
        <span className="text-sm text-gray-500">Buscando detalhamento analítico...</span>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="p-4 bg-gray-50 rounded-md border border-gray-100 text-center">
        <span className="text-sm text-gray-500 italic">Sem insumos detalhados no momento.</span>
      </div>
    )
  }

  const maoDeObra = data.filter(d => d.input?.type === 'MÃO DE OBRA')
  const materiais = data.filter(d => d.input?.type === 'MATERIAL')
  const equipamentos = data.filter(d => d.input?.type === 'EQUIPAMENTO')
  // Se existir tipos não mapeados ou nulos, jogar em Outros
  const outros = data.filter(d => !['MÃO DE OBRA', 'MATERIAL', 'EQUIPAMENTO'].includes(d.input?.type || ''))

  const ItemList = ({ title, items, icon: Icon, colorClass }: { title: string, items: InputData[], icon: React.ElementType, colorClass: string }) => {
    if (items.length === 0) return null
    return (
      <div className="mb-4 last:mb-0">
        <h4 className={`flex items-center gap-2 text-sm font-semibold mb-2 ${colorClass}`}>
          <Icon className="w-4 h-4" />
          {title} ({items.length})
        </h4>
        <div className="bg-white rounded border border-gray-200 overflow-hidden">
          <table className="min-w-full text-xs text-left">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="py-2 px-3 font-medium">Código</th>
                <th className="py-2 px-3 font-medium w-full">Descrição</th>
                <th className="py-2 px-3 font-medium text-right">Coeficiente</th>
                <th className="py-2 px-3 font-medium">Unid.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="py-2 px-3 font-mono text-gray-500">{item.input?.code || '-'}</td>
                  <td className="py-2 px-3 text-gray-700">{item.input?.description}</td>
                  <td className="py-2 px-3 text-right font-mono text-gray-600">{item.coefficient.toFixed(4)}</td>
                  <td className="py-2 px-3 text-gray-500">{item.input?.unit || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 shadow-inner">
      <ItemList title="Mão de Obra" items={maoDeObra} icon={Wrench} colorClass="text-orange-600" />
      <ItemList title="Materiais" items={materiais} icon={Package} colorClass="text-emerald-600" />
      <ItemList title="Equipamentos" items={equipamentos} icon={Zap} colorClass="text-blue-600" />
      <ItemList title="Outros Insumos" items={outros} icon={Package} colorClass="text-gray-600" />
    </div>
  )
}
