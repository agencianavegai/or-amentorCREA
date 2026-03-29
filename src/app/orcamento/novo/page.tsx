import { WizardForm } from "@/components/wizard/WizardForm"

export const metadata = {
  title: "Novo Orçamento | EngIA - CREA",
}

export default function NovoOrcamentoPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex-1 w-full max-w-7xl animate-in fade-in duration-500">
      <div className="flex flex-col gap-6 lg:gap-8 pb-10">
        <section className="flex flex-col gap-2 pt-2 sm:pt-6 pb-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-crea-blue-900">Estruturar Novo Orçamento</h1>
          <p className="text-crea-gray-500 text-sm">Siga os passos abaixo para mapear itens, aplicar quantitativos e emitir o relatório BDI.</p>
        </section>

        <WizardForm />
      </div>
    </div>
  )
}
