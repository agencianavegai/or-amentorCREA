# Product Requirements Document (PRD)
**Produto:** Plataforma de Orçamentação de Engenharia (Mobile-first)
**Público-Alvo:** Engenheiros civis recém-formados e profissionais registrados no CREA-MA.
**Objetivo:** Resolver a dor da precificação técnica, oferecendo uma ferramenta guiada (Wizard inteligente), educativa e institucionalizada para elaboração de orçamentos precisos e padronizados.

---

## 1. Visão Geral e Problema
Engenheiros recém-formados, especialmente no interior do Maranhão, frequentemente perdem oportunidades ou assumem prejuízos por não saberem estruturar orçamentos formais (lidando com SINAPI, SICRO, BDI e Encargos). A plataforma visa transformar esse processo complexo em uma jornada guiada, intuitiva e acessível pelo celular, atuando simultaneamente como ferramenta de cálculo e tutor educacional.

## 2. Princípios de Design e UX
* **Mobile-First & PWA:** Interface otimizada para uso em campo via smartphone, sem necessidade de download em lojas de aplicativos.
* **Identidade Institucional:** Design limpo (Clean UI), sóbrio e confiável, utilizando a paleta de cores do CREA-MA (tons de azul, cinza e branco). Sem gamificação excessiva ou lúdica.
* **Micro-interações Profissionais:** Feedback visual suave (ex: transições de etapas, validação de preenchimento) e selos de conquista técnica (ex: "Primeiro Voo" ao emitir o primeiro orçamento válido).
* **Componente Educativo:** Uso extensivo de *tooltips* contextuais ("i") para explicar conceitos densos (BDI, Encargos Sociais, Desoneração) no momento exato de sua utilização.

## 3. Requisitos do Sistema (MoSCoW)

### 🔴 MUST HAVE (Requisitos Mínimos e Obrigatórios)
1. **Cadastro e Gestão:** Permitir cadastro de serviços, atividades e projetos.
2. **Motor de Cálculo:** Compor orçamentos com: insumos (materiais), mão de obra, equipamentos, encargos sociais, impostos e BDI.
3. **Bases de Referência:** Utilizar estrutura do SINAPI (com flexibilidade para outras bases no futuro). Diferenciar preços desonerados e não desonerados.
4. **Geração de Documento Oficial (PDF/Planilha):** O documento DEVE conter obrigatoriamente:
   * Identificação do profissional (Nome, Registro CREA, CPF/CNPJ).
   * Identificação do cliente/obra.
   * Planilha detalhada (Item, Descrição, Unidade, Quantidade, Custo Unitário, Custo Total).
   * Indicação clara da base utilizada (ex: SINAPI MA Jan/2026, Desonerado).
   * Composição explícita do BDI utilizado.
   * Valor total da obra/serviço.
   * Data de referência dos preços e validade do orçamento.
5. **Acesso Gratuito:** O sistema base deve ser gratuito para profissionais com registro ativo no CREA-MA.

### 🟡 SHOULD HAVE (Diferenciais de Alto Valor)
1. **Assistente de Busca Inteligente (IA):** O usuário digita "Piscina" e o sistema sugere a hierarquia correta (Escavação -> Fundação -> etc.).
2. **Histórico e Templates:** Salvar orçamentos gerados para consulta futura e permitir que sejam reutilizados como "Modelos" para novas obras.
3. **Base de Conhecimento:** Módulo educativo embutido com guias rápidos de precificação.

### 🔵 COULD HAVE (Evolução Futura)
1. Integração via API com serviços do CREA-MA (validação de registro automático, emissão de ART vinculada ao orçamento).
2. Mecanismo de importação de tabelas SINAPI/SICRO atualizadas via upload de arquivo CSV/Excel pelo usuário administrador.

---

## 4. O Fluxo Principal (O "Wizard" de 6 Etapas)
A elaboração do orçamento deve seguir um ciclo de vida estruturado para guiar o profissional:

* **Etapa 1: Setup:** Cabeçalho da obra, cliente, validade, seleção da base (SINAPI) e regime (Desonerado/Não Desonerado).
* **Etapa 2: Assistente de Serviços:** Busca estruturada onde o usuário relata o que fará, e o sistema apresenta as composições correspondentes.
* **Etapa 3: Levantamento (Quantitativos):** Inserção simples da volumetria (m², m³, un, etc.).
* **Etapa 4: Custo Direto (Cálculo):** O sistema exibe de forma transparente o custo unitário (insumos x coeficientes) e calcula o total do serviço.
* **Etapa 5: Fechamento (BDI):** Tela dedicada à configuração do BDI com orientações claras sobre como não ter prejuízo. Geração do Preço de Venda.
* **Etapa 6: Emissão:** Geração do PDF padronizado pronto para assinatura e envio ao cliente.

---

## 5. Arquitetura e Stack Tecnológico
* **Frontend:** Next.js (React), TailwindCSS, implementado como PWA (Progressive Web App).
* **Backend/Database:** Supabase (PostgreSQL para dados relacionais, Auth para autenticação de usuários e RLS para segurança de dados multitenant).
* **Geração de Documentos:** Biblioteca de renderização client-side/server-side (ex: `@react-pdf/renderer`) para garantir formatação exata em PDF.
* **Infraestrutura:** Vercel (Edge Network para alta performance e low-latency).

---

## 6. Critérios de Êxito (Avaliação do Desafio)
* **Valor:** Redução do tempo médio para elaboração de um orçamento e diminuição de erros de cálculo para recém-formados.
* **Usabilidade:** Navegação fluida em dispositivos móveis sem quebra de layout em planilhas complexas.
* **Aderência:** Documento final 100% alinhado com as exigências de responsabilidade técnica do CONFEA/CREA.
* **Escalabilidade:** Banco de dados modelado de forma isolada (`bases_referencia`) permitindo expansão sem refatoração do motor matemático.