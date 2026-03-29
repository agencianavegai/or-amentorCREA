import React, { useState, useEffect } from "react"
import { Search, X, Loader2 } from "lucide-react"
import { useDebounce } from "@/hooks/useDebounce"
import { searchCompositions, CompositionItem } from "@/services/compositions"

interface SearchCompositionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (item: CompositionItem) => void
  initialSearch?: string
  baseId?: string
}

export function SearchCompositionModal({ isOpen, onClose, onSelect, initialSearch = "", baseId }: SearchCompositionModalProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const debouncedSearch = useDebounce(searchTerm, 300)
  const [results, setResults] = useState<CompositionItem[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Initialize early
  useEffect(() => {
    if (isOpen) {
      setSearchTerm(initialSearch)
    } else {
      setSearchTerm("")
      setResults([])
    }
  }, [isOpen, initialSearch])

  useEffect(() => {
    async function fetchResults() {
      if (!debouncedSearch || debouncedSearch.length < 2) {
        setResults([])
        return
      }
      setIsSearching(true)
      try {
        const data = await searchCompositions(debouncedSearch, baseId)
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
  }, [debouncedSearch, isOpen, baseId])

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
          {debouncedSearch.length < 2 ? (
            <div className="h-full flex flex-col items-center justify-center text-crea-gray-400 space-y-2 p-6 text-center">
              <Search className="w-8 h-8 opacity-20" />
              <p className="text-sm">Digite pelo menos 2 caracteres para buscar na base oficial.</p>
            </div>
          ) : results.length === 0 && !isSearching ? (
            <div className="h-full flex items-center justify-center text-crea-gray-500 p-6 text-center">
              <p className="text-sm">Nenhuma composição encontrada para &ldquo;{debouncedSearch}&rdquo;.</p>
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
                    <span className="font-bold text-sm text-crea-blue-900 group-hover:text-crea-blue-700">{item.code}</span>
                    <span className="text-xs font-semibold text-crea-gray-500 bg-crea-gray-100 px-2 py-0.5 rounded">{item.unit}</span>
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
