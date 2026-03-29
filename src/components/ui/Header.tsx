import * as React from "react"
import { Calculator } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-crea-gray-200 bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-crea-blue-600 text-white shadow-sm">
            <Calculator className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-crea-blue-900 leading-none">Copiloto</span>
            <span className="text-[10px] font-bold text-crea-blue-600 uppercase tracking-widest leading-normal">de Orçamentos</span>
          </div>
        </div>
        
        <nav className="flex items-center gap-4 text-sm font-medium">
          <span className="text-crea-gray-500 hidden sm:inline-block border border-crea-gray-200 rounded-md px-3 py-1 bg-crea-gray-50 text-xs font-semibold">
            CREA-MA
          </span>
        </nav>
      </div>
    </header>
  )
}
