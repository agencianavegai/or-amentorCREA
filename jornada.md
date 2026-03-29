1. Acesso e Identificação Institucional
Ação: O utilizador acede à aplicação e visualiza sem tela de login pois ainda é um MVP.

O que muda: Em vez de um e-mail comum, o sistema solicita o Registro CREA.

Impacto: Estabelece confiança imediata e garante que a ferramenta é exclusiva para profissionais habilitados.

Validação: O sistema deve reconhecer o formato do registo e permitir o "Primeiro Acesso" para novos cadastros.

2. Dashboard e Módulo Educativo
Ação: Após o login fake, o utilizador entra na Home Expansiva.

Destaque: Ele visualiza o card "Guia de Precificação".

Educação: Ao clicar, o utilizador aprende sobre os componentes do custo (Direto vs. Indireto) e a importância do BDI.

Critério do Desafio: Atende ao requisito de "Componente Educativo" .

3. Setup do Projeto (Wizard - Etapa 1)
Ação: Clica em "Novo Orçamento".

Inputs: Insere o Nome da Obra (ex: Reforma Praça da Matriz) e Cliente e uma descrição da obra (que não irá pro orçamento, apenas pro agente)

Configuração Técnica: Seleciona a base de referência (SINAPI MA - SINNCRO) e o regime (Desonerado ou Não Desonerado) ou .

Critério do Desafio: Atende ao requisito de indicação da base e regime.

4. Assistente de IA e Busca (Wizard - Etapa 2)
Ao entrar a IA ja deve apresentar baseado no nome da obra e sua descrição um escopo guiado de serviços que devem ser realizados e sugerir as suas composições para que o usuario selecione
Ação: O utilizador descreve o serviço em linguagem natural: "Vou fazer a escavação e concretagem de uma piscina".

Inteligência: O Gemini IA processa e sugere as etapas lógicas e os termos de busca técnicos.

Impacto: Reduz drasticamente o tempo de procura por códigos manuais em tabelas extensas.

5. Seleção e Quantitativos (Wizard - Etapa 3)
Ação: O utilizador clica em "Vincular" nas sugestões da IA.

Busca Real: Uma Bottom Sheet (Mobile) ou Modal (Desktop) permite pesquisar em tempo real na base do Supabase.

Quantificação: O utilizador seleciona o item oficial e insere a quantidade (ex: 50 m³).

Validação: O sistema deve extrair a unidade de medida correta (un, m², m³) da base SINAPI-SINCRO.

6. Conferência de Custo Direto (Wizard - Etapa 4)
Ação: O sistema exibe a planilha dinâmica.

Cálculo: Quantidade x Preço Unitário = Total do Item.

Visibilidade: Exibição clara do Subtotal Geral (Custo Direto) antes dos impostos e lucro.

7. Fechamento e BDI (Wizard - Etapa 5)
Ação: O utilizador insere a taxa de BDI.

Educação: Um Info Card EXTRMAMENTE DESTALHADO como compor a taxa (Lucro, Administração, Riscos).

Cálculo Final: O sistema calcula o Preço de Venda Final instantaneamente.

8. Finalização e Exportação (Wizard - Etapa 6)
Ação: O utilizador clica em "Salvar Orçamento".

Persistência: Os dados são gravados no Supabase (Snapshot dos preços e itens).

Entrega: O botão "Baixar PDF Oficial" é libertado.

O Documento: O PDF gerado contém todos os dados:

Dados do Profissional (CREA/CPF).

Dados do Cliente/Obra.

Planilha detalhada e valor total.

Composição do BDI e validade dos preços.