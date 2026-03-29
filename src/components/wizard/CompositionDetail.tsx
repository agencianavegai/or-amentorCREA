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
  const outros = data.filter(d => !['MÃO DE OBRA', 'MATERIAL', 'EQUIPAMENTO'].includes(d.input?.type || ''))

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

  return (
    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 shadow-inner space-y-6">
      
      {/* MÃO DE OBRA */}
      {maoDeObra.length > 0 && (
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold mb-2 text-orange-600">
            <Wrench className="w-4 h-4" />
            Mão de Obra ({maoDeObra.length})
          </h4>
          <div className="bg-white rounded border border-gray-200 overflow-x-auto">
            <table className="min-w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                <tr>
                  <th className="py-2 px-3 font-medium w-full">Profissional</th>
                  <th className="py-2 px-3 font-medium text-right">Coeficiente (h)</th>
                  <th className="py-2 px-3 font-medium text-right">Custo Unitário</th>
                  <th className="py-2 px-3 font-medium text-right">Custo Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {maoDeObra.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="py-2 px-3 text-gray-700">{item.input?.description}</td>
                    <td className="py-2 px-3 text-right font-mono text-gray-600">{item.coefficient.toFixed(4)}</td>
                    <td className="py-2 px-3 text-right text-gray-600">{formatCurrency(item.input?.unit_price || 0)}</td>
                    <td className="py-2 px-3 text-right font-semibold text-gray-700">
                      {formatCurrency((item.input?.unit_price || 0) * item.coefficient)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MATERIAIS */}
      {materiais.length > 0 && (
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold mb-2 text-emerald-600">
            <Package className="w-4 h-4" />
            Materiais ({materiais.length})
          </h4>
          <div className="bg-white rounded border border-gray-200 overflow-x-auto">
            <table className="min-w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                <tr>
                  <th className="py-2 px-3 font-medium w-full">Material</th>
                  <th className="py-2 px-3 font-medium">Unid.</th>
                  <th className="py-2 px-3 font-medium text-right">Coeficiente</th>
                  <th className="py-2 px-3 font-medium text-right">Custo Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {materiais.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="py-2 px-3 text-gray-700">{item.input?.description}</td>
                    <td className="py-2 px-3 text-gray-500">{item.input?.unit || '-'}</td>
                    <td className="py-2 px-3 text-right font-mono text-gray-600">{item.coefficient.toFixed(4)}</td>
                    <td className="py-2 px-3 text-right font-semibold text-gray-700">
                      {formatCurrency((item.input?.unit_price || 0) * item.coefficient)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* EQUIPAMENTOS */}
      {equipamentos.length > 0 && (
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold mb-2 text-blue-600">
            <Zap className="w-4 h-4" />
            Equipamentos ({equipamentos.length})
          </h4>
          <div className="bg-white rounded border border-gray-200 overflow-x-auto">
            <table className="min-w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                <tr>
                  <th className="py-2 px-3 font-medium w-full">Máquina / Equipamento</th>
                  <th className="py-2 px-3 font-medium text-right">Coeficiente (h)</th>
                  <th className="py-2 px-3 font-medium text-right">Custo Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {equipamentos.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="py-2 px-3 text-gray-700">{item.input?.description}</td>
                    <td className="py-2 px-3 text-right font-mono text-gray-600">{item.coefficient.toFixed(4)}</td>
                    <td className="py-2 px-3 text-right font-semibold text-gray-700">
                      {formatCurrency((item.input?.unit_price || 0) * item.coefficient)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* OUTROS INSUMOS */}
      {outros.length > 0 && (
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-600">
            <Package className="w-4 h-4" />
            Outros Insumos ({outros.length})
          </h4>
          <div className="bg-white rounded border border-gray-200 overflow-x-auto">
            <table className="min-w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                <tr>
                  <th className="py-2 px-3 font-medium w-full">Descrição</th>
                  <th className="py-2 px-3 font-medium">Unid.</th>
                  <th className="py-2 px-3 font-medium text-right">Coeficiente</th>
                  <th className="py-2 px-3 font-medium text-right">Custo Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {outros.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="py-2 px-3 text-gray-700">{item.input?.description}</td>
                    <td className="py-2 px-3 text-gray-500">{item.input?.unit || '-'}</td>
                    <td className="py-2 px-3 text-right font-mono text-gray-600">{item.coefficient.toFixed(4)}</td>
                    <td className="py-2 px-3 text-right font-semibold text-gray-700">
                      {formatCurrency((item.input?.unit_price || 0) * item.coefficient)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  )
}
