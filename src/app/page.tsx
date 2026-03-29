import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Calculator, FileSpreadsheet, FolderOpen, Database, BookOpen, Search, ArrowRight, Zap, Target } from "lucide-react"
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader"

export default function Home() {
  return (
    <div className="flex-1 w-full bg-crea-gray-50 flex flex-col items-center">
      {/* 
        Layer 0: Hero Banner
        Fundo azul escuro profundo, quebrando o cliché do split screen e preenchendo o topo da página com densidade visual institucional. 
      */}
      <div className="w-full bg-gradient-to-br from-crea-blue-900 via-crea-blue-800 to-crea-blue-700 pt-16 lg:pt-20 pb-40 lg:pb-48 px-4 sm:px-6 lg:px-8 shrink-0 relative overflow-hidden">
        {/* Aspecto de textura abstrata (brilho sutil radial) */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <WelcomeHeader />
        </div>
      </div>

      {/* 
        Layer 1: Main Action & Secondary Actions Grid (Z-axis overlap)
        Tensão assimétrica rompendo a margem do banner (lg:-mt-28) em telas maiores.
      */}
      <div className="w-full px-4 sm:px-6 lg:px-8 -mt-24 lg:-mt-32 z-20 relative flex flex-col mb-16">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Main Action - High Visual Weight */}
          <div className="lg:col-span-8 flex flex-col h-full rounded-sm">
            <Card className="h-full border-crea-blue-200 shadow-2xl shadow-crea-blue-900/10 overflow-hidden group hover:border-crea-blue-400 transition-colors duration-300 relative rounded-sm flex flex-col bg-white">
              
              {/* Subtle background blueprint/texture representation */}
              <div className="absolute inset-0 bg-crea-blue-50/30 opacity-60 bg-[linear-gradient(#f0f4f8_1px,transparent_1px),linear-gradient(90deg,#f0f4f8_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none transition-opacity group-hover:opacity-100"></div>
              
              <CardContent className="p-8 sm:p-12 flex flex-col h-full relative z-10">
                <div className="h-16 w-16 bg-crea-blue-600 text-white rounded-sm flex items-center justify-center mb-8 shadow-sm">
                  <Calculator className="h-8 w-8" />
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-extrabold text-crea-blue-900 tracking-tight mb-4">
                  Elaborar Novo Orçamento
                </h2>
                
                <p className="text-crea-gray-600 text-base sm:text-lg max-w-xl mb-12 leading-relaxed font-medium flex-1">
                  Inicie uma composição orçamentária de alta precisão baseada em custos atualizados. Acesse instantaneamente todo o referencial normativo (SINAPI e SICRO) integrado e reduza em até 70% o tempo técnico de montagem.
                </p>
                
                <Link href="/orcamento/novo" className="w-full sm:w-auto self-start mt-auto">
                  <Button variant="primary" className="w-full sm:w-auto text-base px-8 py-6 h-auto font-bold tracking-wide flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5">
                    <FileSpreadsheet className="h-5 w-5" />
                    Iniciar Novo Projeto
                    <ArrowRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Secondary Actions - Right side */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8">
            <Card className="flex-1 border-crea-gray-200 shadow-sm hover:shadow-md hover:border-crea-blue-300 transition-all duration-300 rounded-sm bg-white">
              <CardContent className="p-6 md:p-8 flex flex-col h-full justify-between">
                <div>
                  <div className="h-14 w-14 bg-white border border-crea-gray-200 text-crea-blue-800 rounded-sm flex items-center justify-center mb-5 shadow-sm">
                    <Database className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-crea-blue-900 mb-2">Bases de Referências</h3>
                  <p className="text-sm text-crea-gray-600 leading-relaxed mb-8">
                    Acesse e importe tabelas oficiais para compor a base de dados do sistema localmente.
                  </p>
                </div>
                <Button variant="secondary" className="w-full font-bold">Gerenciar Bases</Button>
              </CardContent>
            </Card>

            <Card className="flex-1 border-crea-gray-200 shadow-sm hover:shadow-md hover:border-crea-blue-300 transition-all duration-300 rounded-sm bg-white">
              <CardContent className="p-6 md:p-8 flex flex-col h-full justify-between">
                <div>
                  <div className="h-14 w-14 bg-white border border-crea-gray-200 text-crea-blue-800 rounded-sm flex items-center justify-center mb-5 shadow-sm">
                    <FolderOpen className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-crea-blue-900 mb-2">Meus Projetos Salvos</h3>
                  <p className="text-sm text-crea-gray-600 leading-relaxed mb-8">
                    Visualize projetos anteriores, retome edições ou exporte planilhas e relatórios em PDF.
                  </p>
                </div>
                <Button variant="outline" className="w-full font-bold">Acessar Arquivos</Button>
              </CardContent>
            </Card>
          </div>
          
        </div>

        {/* Layer 2: Educational Highlight (Dicas & Tutoriais de Precificação) */}
        <div className="max-w-7xl mx-auto w-full mt-24 mb-10">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="h-7 w-7 text-crea-blue-700" />
            <h2 className="text-2xl font-bold tracking-tight text-crea-blue-900">Dicas & Tutoriais de Precificação</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <a href="#" className="group flex flex-col xl:flex-row bg-white border border-crea-gray-200 rounded-sm shadow-sm hover:shadow-md hover:border-crea-blue-300 transition-all duration-200 overflow-hidden">
              <div className="bg-crea-gray-100 flex items-center justify-center p-6 xl:w-28 shrink-0 xl:border-r border-b xl:border-b-0 border-crea-gray-200 transition-colors group-hover:bg-crea-blue-50">
                <Target className="h-8 w-8 text-crea-blue-600" />
              </div>
              <div className="p-5 flex flex-col justify-center flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-crea-blue-500 mb-1">Guia Essencial</span>
                <h4 className="font-bold text-sm sm:text-base text-crea-gray-900 mb-2 leading-tight group-hover:text-crea-blue-700 transition-colors">Composição de BDI e Encargos</h4>
                <p className="text-sm text-crea-gray-500 line-clamp-2 leading-relaxed">Boas práticas para a correta inserção de impostos indiretos nos seus cálculos.</p>
              </div>
            </a>

            <a href="#" className="group flex flex-col xl:flex-row bg-white border border-crea-gray-200 rounded-sm shadow-sm hover:shadow-md hover:border-crea-blue-300 transition-all duration-200 overflow-hidden">
              <div className="bg-crea-gray-100 flex items-center justify-center p-6 xl:w-28 shrink-0 xl:border-r border-b xl:border-b-0 border-crea-gray-200 transition-colors group-hover:bg-crea-blue-50">
                <Search className="h-8 w-8 text-crea-blue-600" />
              </div>
              <div className="p-5 flex flex-col justify-center flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-crea-blue-500 mb-1">Pesquisa Técnica</span>
                <h4 className="font-bold text-sm sm:text-base text-crea-gray-900 mb-2 leading-tight group-hover:text-crea-blue-700 transition-colors">Buscador Inteligente do SINAPI</h4>
                <p className="text-sm text-crea-gray-500 line-clamp-2 leading-relaxed">Descubra insumos complexos mais rápido utilizando nossa ferramenta de filtros.</p>
              </div>
            </a>

            <a href="#" className="group flex flex-col xl:flex-row bg-white border border-crea-gray-200 rounded-sm shadow-sm hover:shadow-md hover:border-crea-blue-300 transition-all duration-200 overflow-hidden">
              <div className="bg-crea-gray-100 flex items-center justify-center p-6 xl:w-28 shrink-0 xl:border-r border-b xl:border-b-0 border-crea-gray-200 transition-colors group-hover:bg-crea-blue-50">
                <Zap className="h-8 w-8 text-crea-blue-600" />
              </div>
              <div className="p-5 flex flex-col justify-center flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-crea-blue-500 mb-1">Dica de Produtividade</span>
                <h4 className="font-bold text-sm sm:text-base text-crea-gray-900 mb-2 leading-tight group-hover:text-crea-blue-700 transition-colors">Navegação Express e Atalhos</h4>
                <p className="text-sm text-crea-gray-500 line-clamp-2 leading-relaxed">Acelere o fluxo de montagem orçamentária usando atalhos de teclado focados.</p>
              </div>
            </a>

          </div>
        </div>

      </div>
    </div>
  );
}
