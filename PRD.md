# 🧾 PRD — Sistema Letícia Martins

## 1. 🎯 Visão do Produto

Sistema web para gestão de clientes, projetos e finanças de uma personal organizer.

O sistema tem como objetivo centralizar operações, fornecer clareza financeira e apoiar decisões estratégicas do negócio.

---

## 2. 🧩 Stack Tecnológica

- Frontend: Next.js 16 com App Router e Turbopack
- UI: Tailwind CSS v4.2 + shadcn/ui
- Ícones: lucide-react
- Backend: Supabase
- Banco de Dados: PostgreSQL
- Autenticação: Supabase Auth
- Estado local: zustand, quando necessário
- Validação: zod
- Formulários client-side: react-hook-form + zod quando houver validação no browser

---

## 3. 👤 Usuários

### 3.1 Admin

- Letícia Martins
- Acesso total ao sistema

### 3.2 Futuro

- Assistentes (acesso restrito)

---

## 4. 📦 Módulos do Sistema

- Clientes (CRM)
- Assistentes
- Projetos
- Financeiro
- Dashboard

---

## 5. 🧠 Regras de Negócio

### 5.1 Clientes

- Um cliente pode indicar outro cliente
- Origem do cliente é obrigatória
- Origens possíveis:
  - Instagram
  - Google
  - Site
  - Parceiros
  - Indicação

---

### 5.2 Projetos

- Todo projeto pertence a um cliente
- Um cliente pode ter vários projetos
- Projetos possuem receitas e despesas vinculadas

---

### 5.3 Financeiro (Regra Crítica)

Separação obrigatória dos dados financeiros:

#### Receitas

- Podem ou não estar vinculadas a um projeto

#### Despesas de Projeto

- Sempre vinculadas a um projeto

#### Despesas Fixas

- Nunca vinculadas a projetos

---

## 6. 🗃️ Modelagem de Dados

### 6.1 Clients

- id
- name
- profession
- created_at
- spouse
- address
- city
- cpf
- email
- phone
- birth_date
- notes
- origin
- referrer_id (self relation)

---

### 6.2 Assistants

- id
- name
- phone
- birth_date
- created_at

---

### 6.3 Services

- id
- name

---

### 6.4 Projects

- id
- name
- client_id
- service_id
- total_value
- start_date
- end_date
- status

---

### 6.5 Revenues

- id
- description
- category
- amount
- date
- project_id (nullable)

---

### 6.6 Project Expenses

- id
- project_id
- assistant_id (nullable)
- category
- description
- amount
- date

---

### 6.7 Fixed Expenses

- id
- category
- description
- amount
- date

---

## 7. 🔄 Fluxos Principais

### 7.1 Cadastro de Cliente

- Criar cliente
- Definir origem ou cliente indicador

---

### 7.2 Criação de Projeto

- Selecionar cliente
- Definir serviço
- Informar valor
- Criar projeto

---

### 7.3 Lançamento Financeiro

#### Receita

- Criar receita
- Opcionalmente vincular a projeto

#### Despesa de Projeto

- Criar despesa vinculada a projeto

#### Despesa Fixa

- Criar despesa independente de projeto

---

### 7.4 Dashboard

- Visualização de KPIs financeiros
- Análise de desempenho do negócio

---

## 8. 📊 KPIs e Métricas

- Receita total
- Despesa total
- Lucro líquido
- Lucro por projeto
- Custo fixo mensal
- Ticket médio por projeto
- Origem de clientes

---

## 9. 🖥️ Telas do Sistema

### Dashboard

- Visão inicial com KPIs financeiros prioritários
- Cards compactos com receita total, despesa total, lucro líquido e custo fixo mensal
- Gráfico de receitas vs despesas
- Destaques de atenção para queda de lucro, aumento de despesas ou projetos com baixa margem

---

### Clientes

- Listagem com filtros por nome, cidade, origem e período de cadastro
- Cadastro e edição em formulário limpo, com campos agrupados por informação pessoal, contato e origem
- Visualização de indicações e cliente indicador
- Ações rápidas com ícones: visualizar, editar, excluir e entrar em contato

---

### Projetos

- Listagem com status, cliente, serviço, datas e valor total
- Detalhes do projeto com resumo financeiro vinculado
- Seção de receitas e despesas de projeto separadas visualmente
- Ações rápidas com ícones: visualizar, editar, adicionar receita, adicionar despesa

---

### Financeiro

- Listagem geral com separação clara entre receitas, despesas de projeto e despesas fixas
- Filtros por tipo, categoria, projeto e período
- Botões de lançamento financeiro distintos para receita, despesa de projeto e despesa fixa
- Sinalização visual para impedir mistura entre despesas fixas e despesas de projeto

---

## 10. 🎨 Diretrizes de Design

- Estilo clean, sofisticado e funcional, seguindo o conceito "Sophisticated Order"
- Interface minimalista, com foco em clareza financeira e produtividade
- Uso consistente dos tokens definidos em `DESIGN.md`
- Priorizar Tailwind CSS classes em vez de estilos inline
- Usar variáveis CSS para tokens de cor, espaçamento e raio
- Usar `oklch` para cores no CSS final
- Evitar complexidade visual que não ajude na tomada de decisão

### 10.1 Layout

- Usar grid desktop de 12 colunas com gutters de 24px
- Usar escala de espaçamento baseada em 8px
- Margens de página generosas, preferencialmente 32px ou 48px em desktop
- Seções devem ter respiro vertical, principalmente em dashboards e telas financeiras
- Evitar cards dentro de cards
- Cards devem representar itens, KPIs, blocos de dados ou modais, não páginas inteiras
- Em mobile, priorizar leitura em coluna única e ações principais sempre acessíveis

### 10.2 Tipografia

- Usar Noto Serif para títulos e áreas de maior hierarquia visual
- Usar Manrope para textos funcionais, labels, botões, tabelas e formulários
- Títulos devem ser usados com moderação para manter o produto com aparência editorial e profissional
- Textos de interface devem ser objetivos, orientados a ação e sem excesso de instruções

### 10.3 Cores e Superfícies

- Usar plum profundo como cor primária para ações principais e estados ativos
- Usar tons rose/magenta apenas como apoio para estados, seleção e destaques
- Usar camadas tonais em vez de sombras fortes
- Bordas finas devem ser preferidas para separar cards, tabelas e painéis
- Sombras devem ser suaves e reservadas para modais, menus e elementos flutuantes
- Não usar paletas improvisadas fora dos tokens definidos

### 10.4 Botões

- Usar componentes shadcn/ui para botões
- Botão primário: ação principal da tela, com preenchimento na cor primária
- Botão secundário: ações alternativas, preferencialmente com borda ou variante discreta
- Botão destrutivo: apenas para exclusões ou ações irreversíveis
- Botões devem ter altura, padding e tipografia consistentes
- Ações com significado visual claro devem usar ícone lucide junto do texto ou somente ícone quando o contexto for evidente
- Botões somente com ícone devem ter tooltip ou `aria-label`
- Evitar múltiplos botões primários competindo na mesma região da tela

### 10.5 Ícones

- Usar lucide-react como biblioteca padrão
- Ícones devem seguir estilo line minimalista
- Usar stroke visual consistente, preferencialmente 1.5px quando customizável
- Ícones ativos usam cor primária; ícones neutros usam cor de texto secundário ou variante de superfície
- Não misturar bibliotecas de ícones sem necessidade
- Ícones devem reforçar uma ação, não decorar a interface sem função

### 10.6 Formulários

- Usar componentes shadcn/ui para inputs, selects, dialogs e feedbacks
- Labels acima dos campos, com boa legibilidade
- Validação deve ser feita com zod
- Em formulários client-side com validação no browser, usar react-hook-form + zod
- Campos financeiros devem deixar claro se o lançamento é receita, despesa de projeto ou despesa fixa
- Despesa de projeto deve exigir projeto selecionado
- Despesa fixa não deve exibir campo de projeto

### 10.7 Tabelas e Listagens

- Listagens devem ser escaneáveis, com colunas úteis para decisão
- Ações de linha devem usar ícones consistentes
- Filtros devem ficar próximos da listagem que controlam
- Estados vazio, carregando e erro devem ser tratados com componentes reutilizáveis
- Dados financeiros devem ter alinhamento e formatação consistentes

### 10.8 Critérios de Aceite Visual

- A tela deve usar tokens do design system
- Botões e ícones devem seguir os padrões definidos neste PRD
- Não deve haver estilos inline para decisões visuais permanentes
- Não deve haver chamadas diretas ao Supabase em componentes
- A interface deve deixar clara a separação entre receitas, despesas de projeto e despesas fixas
- Layout deve funcionar em desktop e mobile sem sobreposição ou quebra de texto

---

## 11. 🔐 Segurança

- Autenticação via Supabase Auth
- Uso de Row Level Security (RLS)
- Proteção de rotas no frontend

---

## 12. 🚀 Roadmap

### MVP

- CRUD de clientes, projetos e financeiro
- Dashboard básico

---

### V2

- Relatórios avançados
- Exportação de dados (PDF / Excel)

---

### V3

- Automações
- Integrações externas (WhatsApp, etc.)

---

## 13. 🧠 Princípio do Produto

Este sistema não deve ser apenas operacional.

Ele deve permitir que o usuário:

- Entenda sua saúde financeira
- Tome decisões baseadas em dados
- Otimize o crescimento do negócio
