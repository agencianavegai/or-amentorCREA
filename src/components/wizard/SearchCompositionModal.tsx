import React, { useState, useEffect } from "react"
import { Search, X, Loader2 } from "lucide-react"
import { useDebounce } from "@/hooks/useDebounce"
import { searchCompositions, CompositionItem } from "@/services/compositions"
import { Badge } from "@/components/ui/Badge"
import { BASE_IDS } from "@/lib/constants"

interface SearchCompositionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (item: CompositionItem) => void
  initialSearch?: string
  baseIds?: string[]
}

export function SearchCompositionModal({ isOpen, onClose, onSelect, initialSearch = "", baseIds }: SearchCompositionModalProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const debouncedSearch = useDebounce(searchTerm, 300)
  const [results, setResults] = useState<CompositionItem[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Initialize early and extract keywords if initialSearch is too long
  useEffect(() => {
    if (isOpen) {
      if (initialSearch.length > 40) {
        // Extrai palavras-chave básicas se o texto for muito longo
        const words = initialSearch.toLowerCase().replace(/[^\w\sà-ú]/gi, '').split(/\s+/)
        const stopWords = ['para', 'com', 'sem', 'dos', 'das', 'uma', 'como', 'sobre', 'sob', 'por']
        const keywords = words.filter(w => w.length > 3 && !stopWords.includes(w)).slice(0, 3).join(' ')
        setSearchTerm(keywords || initialSearch.substring(0, 40))
      } else {
        setSearchTerm(initialSearch)
      }
    } else {
      setSearchTerm("")
      setResults([])
    }
  }, [isOpen, initialSearch])

  useEffect(() => {
    async function fetchResults() {
      // Se não tem texto e não está carregando inicial, também busca para mostrar um "Top Destaques"
      setIsSearching(true)
      try {
        const data = await searchCompositions(debouncedSearch, baseIds)
        setResults(data)
      } catch (err) {
        console.error("Erro na busca", err)
      } finally {
        setIsSearching(false)
      }
    }
    
    if (isOpen) {
      fetchResults()
    }
  }, [debouncedSearch, isOpen, baseIds])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4">
      {/* Container Responsivo (Bottom Sheet no Mobile, Modal no Desktop) */}
      <div className="bg-white w-full sm:max-w-xl h-[85vh] sm:h-[600px] rounded-t-2xl sm:rounded-xl shadow-xl flex flex-col animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-4 border-b border-crea-gray-100">
          <h3 className="font-semibold text-crea-gray-900">Buscar Composição</h3>
          <button onClick={onClose} className="p-2 text-crea-gray-500 hover:bg-crea-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-crea-gray-100 bg-crea-gray-50">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-crea-gray-400" />
            <input 
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-11 w-full rounded-md border border-crea-gray-300 bg-white pl-10 pr-3 py-2 text-sm text-crea-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-crea-blue-500 focus:border-crea-blue-500" 
              placeholder="Digite o código ou nome do serviço..." 
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-3 h-5 w-5 text-crea-blue-500 animate-spin" />
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {isSearching && results.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-crea-gray-400 space-y-2 p-6 text-center">
              <Loader2 className="w-8 h-8 opacity-50 animate-spin" />
              <p className="text-sm">Buscando na base oficial...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-crea-gray-500 p-6 text-center space-y-2">
              <Search className="w-10 h-10 text-crea-gray-300 mb-2" />
              <p className="text-sm font-medium">Nenhuma composição exata encontrada para este termo.</p>
              <p className="text-xs text-crea-gray-400">Tente simplificar a busca.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className="w-full text-left p-3 hover:bg-crea-blue-50 border border-transparent hover:border-crea-blue-100 rounded-lg transition-colors group flex flex-col gap-1"
                >
                  <div className="flex justify-between items-start w-full">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-crea-blue-900 group-hover:text-crea-blue-700">{item.code}</span>
                      <Badge variant={item.base_id === BASE_IDS.SINAPI ? 'sinapi' : item.base_id === BASE_IDS.SICRO ? 'sicro' : 'default'} className="text-[10px] py-0">
                        {item.base_id === BASE_IDS.SINAPI ? '[SINAPI MA]' : item.base_id === BASE_IDS.SICRO ? '[SICRO]' : 'Desconhecido'}
                      </Badge>
                    </div>
                    <span className="text-xs font-semibold text-crea-gray-500 bg-crea-gray-100 px-2 py-0.5 rounded shrink-0">{item.unit}</span>
                  </div>
                  <span className="text-sm text-crea-gray-700 leading-snug line-clamp-2">{item.description}</span>
                  <span className="text-xs font-medium text-crea-gray-500 mt-1">
                    Custo Unit.: <strong className="text-crea-gray-900">R$ {item.unit_cost?.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
