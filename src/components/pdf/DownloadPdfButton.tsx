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
      document={<OrcamentoDocument data={data} subtotal={subtotal} totalBDI={totalBDI} totalGeral={totalGeral} />}
      fileName={`Orcamento_${data.setup.nomeObra?.replace(/\s+/g, '_') || 'Projeto'}.pdf`}
    >
      {({ loading }) => (
        <Button 
          type="button" 
          variant="outline" 
          className="w-full sm:w-auto" 
          disabled={loading || disabled}
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Gerando Documento...</>
          ) : (
            <><FileDown className="w-4 h-4 mr-2" /> Baixar PDF Oficial</>
          )}
        </Button>
      )}
    </PDFDownloadLink>
  )
}

export default DownloadPdfButtonRaw
