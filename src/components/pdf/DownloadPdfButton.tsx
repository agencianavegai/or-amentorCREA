"use client"

import React, { useEffect, useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { FileDown, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { OrcamentoDocument } from './OrcamentoDocument'
import { OrcamentoWizardData } from '@/lib/schemas/orcamento'

interface DownloadPdfButtonProps {
  data: OrcamentoWizardData
  subtotal: number
  totalBDI: number
  totalGeral: number
  disabled?: boolean
}

export function DownloadPdfButtonRaw({ data, subtotal, totalBDI, totalGeral, disabled }: DownloadPdfButtonProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button type="button" variant="outline" className="w-full sm:w-auto" disabled>
        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Preparando PDF...
      </Button>
    )
  }

  return (
    <PDFDownloadLink
      document={<OrcamentoDocument data={data} subtotal={subtotal} totalBDI={totalBDI} totalGeral={totalGeral} dateStr={new Date().toLocaleDateString('pt-BR')} />}
      fileName={`Orcamento_${data.setup.nomeObra?.replace(/\s+/g, '_') || 'Projeto'}_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`}
    >
      {({ loading, error }) => {
        if (error) {
          console.error("PDF Generation Error (react-pdf): ", error)
        }
        return (
        <Button 
          type="button" 
          variant="outline" 
          className="w-full sm:w-auto" 
          disabled={loading || disabled || !!error}
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Gerando Documento...</>
          ) : error ? (
            <span className="text-red-500 font-medium text-sm flex items-center">Erro ao Gerar PDF</span>
          ) : (
            <><FileDown className="w-4 h-4 mr-2" /> Baixar PDF Oficial</>
          )}
        </Button>
      )}}
    </PDFDownloadLink>
  )
}

export default DownloadPdfButtonRaw
