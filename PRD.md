# 🧾 PRD — Sistema Letícia Martins

## 1. 🎯 Visão do Produto

Sistema web para gestão de clientes, projetos e finanças de uma personal organizer.

O sistema tem como objetivo centralizar operações, fornecer clareza financeira e apoiar decisões estratégicas do negócio.

---

## 2. 🧩 Stack Tecnológica

- Frontend: Next.js (App Router)
- UI: Tailwind CSS + shadcn/ui
- Backend: Supabase
- Banco de Dados: PostgreSQL
- Autenticação: Supabase Auth

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

- Cards com KPIs
- Gráfico de receitas vs despesas

---

### Clientes

- Listagem com filtros
- Cadastro e edição
- Visualização de indicações

---

### Projetos

- Listagem
- Detalhes do projeto
- Financeiro vinculado

---

### Financeiro

- Listagem geral
- Filtros por tipo, categoria e período

---

## 10. 🎨 Diretrizes de Design

- Estilo clean e sofisticado
- Interface minimalista
- Foco em usabilidade e produtividade
- Uso consistente de espaçamentos e tipografia

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
