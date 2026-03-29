# Documentação Técnica e Especificações - Copiloto de Orçamentos

Este documento responde aos tópicos exigidos sobre a infraestrutura, engenharia e arquitetura do MVP "Copiloto de Orçamentos", desenvolvido para o Desafio *Precision Budgeting*.

---

### 4. Tecnologias utilizadas e justificativa:

- **Next.js (App Router) & React:** Framework principal da aplicação. Escolhido por permitir a unificação entre Frontend (React) e Backend (API Routes e Server Actions), garantindo alta velocidade de desenvolvimento, SEO e performance (Server-Side Rendering).
- **Tailwind CSS & Lucide Icons:** Utilizados para a construção acelerada de uma interface moderna, responsiva e agradável (UI/UX), sem a necessidade de escrever arquivos CSS verbosos.
- **Supabase (PostgreSQL):** Funciona como nosso Backend-as-a-Service (BaaS) e Database. Justifica-se pela sua rapidez de configuração, autenticação nativa e API escalável em cima de um banco relacional robusto (Postgres).
- **Google Gemini API (Modelo Gemini 2.5 Flash):** O motor de Inteligência Artificial da aplicação. Foi escolhido pela sua alta velocidade de inferência (baixa latência para o usuário), excelente janela de contexto e baixo custo transacional em produção, aliado a uma forte capacidade de gerar saídas estruturadas em JSON.
- **Zod & React Hook Form:** Para tipagem de segurança (TypeScript) e validações robustas do formulário multistep (Wizard). Eles previnem *garbage data* e garantem que regras complexas do edital (como CPFs e registros do CREA) sejam seguidas.
- **@react-pdf/renderer:** Biblioteca para geração dinâmica dos orçamentos finais em formato PDF, rodando diretamente no navegador com dados em tempo real.

---

### 5. Passos para implementação, cronograma e recursos necessários:

Este projeto já encontra-se em estágio de MVP Funcional (Minimum Viable Product). Para evoluí-lo para uma aplicação *Enterprise-ready*, o cronograma estimado das próximas fases seria:

**Fase 1: Refinamento de MVP (1 Mês)**
- *Recursos:* 1 Desenvolvedor Full-Stack.
- *Passos:* Refinamento do Layout, finalização da responsividade móvel, tratativas profundas de erros (Error Boundaries) e monitoramento inicial (Sentry).

**Fase 2: Autenticação e Multitenancy (2 Meses)**
- *Recursos:* 1 Engenheiro de Software, 1 Designer UX.
- *Passos:* Migrar do modelo de *Guest Session* atual para um fluxo sólido de "Login via CREA/Gov.br", isolar workspaces (arquitetura multitenant) por engenheiro/escritório e implementar dashboards gerenciais.

**Fase 3: Sincronização e Escalabilidade de Dados SINAPI/SICRO (3 Meses)**
- *Recursos:* 1 Engenheiro de Dados, 1 Desenvolvedor Backend.
- *Passos:* Criação de workers em background (CRON) para importar mensalmente e atualizar milhões de linhas de bases oficiais da Caixa/DNIT no banco do Supabase via ETL.

---

### 10. Manual de instalação e configuração:

Para executar o projeto localmente em um ambiente de desenvolvimento:

**Pré-requisitos:** Node.js (v18+) e NPM instalados. Instância do Supabase ativa. Chave de API do Google AI Studio.

1. **Clone o repositório e baixe as dependências:**
   ```bash
   git clone <repo-url>
   cd orcamento-app
   npm install
   ```

2. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:
   ```env
   # Credenciais do Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://sua-url-do-supabase.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui

   # Credenciais de IA (Google Gemini)
   GEMINI_API_KEY=sua-chave-aqui
   ```

3. **Inicie o Servidor Local:**
   ```bash
   npm run dev
   ```
   Acesse `http://localhost:3000` no seu navegador. A aplicação estará pronta para criar orçamentos proativos.

---

### 11. Arquitetura do Sistema:

O sistema utiliza uma arquitetura *Serverless/Edge* moderna (Modelo Cliente-Servidor Monolítico Modular).
- **Interface/Cliente:** Composta por componentes React hospedados e servidos via Vercel Edge Network. O estado complexo (Wizard) trafega localmente usando Contextos e React Hook Form.
- **Camada Lógica (Middle Tier):** Utiliza as *Server Actions* do Next.js (ex: `src/actions/budget.ts`). Isso permite mutações e queries seguras diretamente do frontend sem a necessidade de manter endpoints REST extensos.
- **Camada de IA:** Uma Rota de API protegida (`/api/suggest-services`) proxyia a requisição entre o Cliente (navegador) e a API do Gemini. Essa proteção oculta chaves secretas e injeta toda a "personalidade" técnica (Engenharia de Prompt) pelo servidor.
- **Camada de Dados:** Supabase isolado em nuvem, recebendo queries diretas e autenticadas do backend para registrar `users`, `projects` e os arrays gigantescos de `budgets`.

---

### 12. Detalhes dos algoritmos de IA utilizados:

A aplicação **não treina modelos do zero**. Em vez disso, ela utiliza *Prompt Engineering Avançado* manipulando um LLM de conhecimento geral (Google Gemini 2.5 Flash) via API proprietária.
- **Algoritmo Base:** Modelos de Linguagem Grande (LLMs) baseados na arquitetura *Transformer*.
- **Técnica Aplicada (Zero-Shot & System Instructions):** O algoritmo de IA é manipulado puramente dentro da aplicação usando instruções rigorosas no sistema (`systemInstruction`). Nós o "restringimos" assumindo uma Persona (Engenheiro de Custos Sênior) e forçamos aderência estrutural (`responseSchema`) em JSON. 
- **Escopo Proativo:** A inferência é feita combinando o "Nome da Obra", a "Descrição do Projeto" (dados declarados pelo usuário na Etapa 1 do sistema), com um pedido de escopo das normas do sistema SINAPI. 

---

### 13. Criou alguma API? Inclua a documentação:

Sim. Foi criada uma Rota de API interna usada especificamente para desacoplar a requisição da IA do lado do cliente e orquestrar as sugestões.

**Endpoint:** `/api/suggest-services`
**Método:** `POST`
**Descrição:** Processa os dados de uma obra civil e retorna um detalhamento estruturado e array de sugestões de serviços associados a metodologias típicas brasileiras (SINAPI), encapsuladas em JSON.

**Payload de Requisição (JSON):**
```json
{
  "nomeObra": "Reforma da Praça Central",
  "descricaoObra": "Demolição do piso atual e inclusão de bancos de concreto",
  "prompt": "Foque no paisagismo" // Opcional: usado para refino manual
}
```

**Exemplo de Resposta de Sucesso (200 OK):**
```json
{
  "data": [
    {
      "etapa": "Demolições",
      "sugestao_busca": "Demolição de piso cimentado",
      "justificativa": "Necessário para preparo do substrato conforme descrito.",
      "isAutoGenerated": true
    },
    {
      "etapa": "Paisagismo",
      "sugestao_busca": "Banco de concreto armado apoiado",
      "justificativa": "Mobiliário urbano especificado na requisição",
      "isAutoGenerated": true
    }
  ]
}
```

---

### 14. Espaço para informação extra:

**Cálculo Dinâmico Tributário (BDI e Desoneração da Folha):**
A aplicação possui um motor reativo inteligente sob as diretrizes tributárias. Durante a jornada do usuário, a plataforma ajusta de forma automática (na Etapa 5) o reflexo da taxa de impostos nos Lucros e Despesas Indiretas:
- **Obra Desonerada:** É taxada com o peso padrão de `4,50%` sobre o BDI da composição.
- **Obra Não Desonerada:** Absorve encargos maiores na ponta, assumindo em média a parcela de `8,65%`.
Isso impacta cada sub-item (mão de obra, material) inserido em tempo real, fornecendo orçamentos precisos do começo ao fim.
