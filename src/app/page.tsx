import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card"

export default function Home() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex-1 w-full max-w-7xl">
      <div className="flex flex-col gap-8 pb-10">
        <section className="flex flex-col gap-2 pt-6 pb-2">
          <h1 className="text-3xl font-bold tracking-tight text-crea-blue-900">Dashboard</h1>
          <p className="text-crea-gray-500 text-sm">Bem-vindo ao Copiloto de Orçamentos da Engenharia.</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Novo Orçamento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-crea-gray-500">Crie um orçamento selecionando composições do SINAPI e SICRO com precisão.</p>
            </CardContent>
            <CardFooter>
              <Link href="/orcamento/novo" className="w-full">
                <Button variant="primary" className="w-full">Criar Orçamento</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bases de Referência</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-crea-gray-500">Importe as planilhas CSV do SINAPI para popular o seu banco de dados.</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full">Gerenciar Bases</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Projetos Salvos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-crea-gray-500">Acesse orçamentos recentes, edite ou exporte para formato PDF institucional.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Ver Histórico</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

