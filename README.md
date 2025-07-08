# Test Automation Hub 🚀

Uma plataforma completa e moderna para gerenciamento e execução de testes automatizados, desenvolvida com Next.js 14, TypeScript e Tailwind CSS.

## 📋 Sobre o Projeto

O Test Automation Hub é uma solução abrangente para equipes de QA e desenvolvimento que precisam gerenciar, executar e monitorar testes automatizados de forma eficiente. A plataforma oferece uma interface intuitiva e moderna para visualizar métricas, gerenciar projetos de teste e acompanhar resultados em tempo real.

## ✨ Principais Funcionalidades

### 🏠 Dashboard Interativo

- **Métricas em Tempo Real**: Visualização instantânea de taxa de sucesso, testes executados e performance
- **Atividade Recente**: Acompanhamento dos últimos testes executados e suas situações
- **Ações Rápidas**: Acesso direto às principais funcionalidades da plataforma
- **Cards Informativos**: Resumo visual dos projetos ativos e estatísticas principais

### 📊 Gerenciamento de Projetos

- **Visão Geral de Projetos**: Lista completa de todos os projetos de teste
- **Métricas por Projeto**: Taxa de sucesso, cobertura de testes e performance individual
- **Status em Tempo Real**: Acompanhamento do status atual de cada projeto
- **Filtros e Busca**: Localização rápida de projetos específicos

### 🧪 Gerenciamento de Testes

- **Biblioteca de Testes**: Organização completa de todos os casos de teste
- **Editor de Código Avançado**: Interface profissional com análise sintática, léxica e semântica para JavaScript/TypeScript
- **Syntax Highlighting**: Cores específicas para keywords, métodos Playwright, strings e comentários
- **Auto-Complete Inteligente**: Sugestões contextuais para Playwright, snippets de código e métodos
- **Análise em Tempo Real**: Detecção de erros sintáticos, anti-padrões e sugestões de melhoria
- **Quick Fixes**: Correções automáticas e sugestões de otimização
- **Auto-Indentação**: Indentação inteligente com suporte a estruturas JavaScript
- **Execução em Lote**: Capacidade de executar múltiplos testes simultaneamente
- **Histórico Detalhado**: Rastreamento completo do histórico de execuções
- **Suporte a Múltiplas Linguagens**: Compatibilidade com diferentes frameworks de teste

### 📈 Relatórios e Analytics

- **Relatórios Detalhados**: Análises profundas de performance e resultados
- **Métricas Avançadas**: Gráficos e indicadores de tendências
- **Exportação de Dados**: Capacidade de exportar relatórios em diferentes formatos
- **Resumo Executivo**: Visão estratégica para stakeholders
- **Filtros por Período**: Análise temporal customizável

### 🎨 Interface e Experiência

- **Design Moderno**: Interface limpa e intuitiva baseada em design system
- **Tema Escuro/Claro**: Suporte completo a ambos os modos com elementos principais sempre em modo claro
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Navegação Intuitiva**: Menu lateral com acesso rápido a todas as funcionalidades

## 🛠️ Tecnologias Utilizadas

### Frontend

- **Next.js 14**: Framework React com App Router e Server Components
- **TypeScript**: Tipagem estática para maior segurança e produtividade
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e consistente
- **Radix UI**: Componentes acessíveis e altamente customizáveis
- **Lucide React**: Ícones modernos e consistentes

### Componentes e UI

- **shadcn/ui**: Sistema de componentes baseado em Radix UI e Tailwind
- **React Hook Form**: Gerenciamento eficiente de formulários
- **Recharts**: Biblioteca para criação de gráficos e visualizações
- **Next Themes**: Gerenciamento de temas escuro/claro
- **Class Variance Authority**: Utilitário para variantes de componentes

### Ferramentas de Desenvolvimento

- **ESLint**: Linting para manter qualidade do código
- **PostCSS**: Processamento avançado de CSS
- **Autoprefixer**: Compatibilidade automática entre navegadores

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js 18+
- npm, yarn ou pnpm
- Git

### Instalação

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd test-automation-hub
```

2. **Instale as dependências**

```bash
# Com npm
npm install

# Com yarn
yarn install

# Com pnpm (recomendado)
pnpm install
```

3. **Execute o projeto em modo de desenvolvimento**

```bash
# Com npm
npm run dev

# Com yarn
yarn dev

# Com pnpm
pnpm dev
```

4. **Acesse a aplicação**
   - Abra [http://localhost:3000](http://localhost:3000) no seu navegador
   - O projeto redirecionará automaticamente para `/dashboard`

### Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Executar versão de produção
pnpm start

# Linting
pnpm lint
```

## 📁 Estrutura do Projeto

```
test-automation-hub/
├── app/                          # App Router do Next.js 14
│   ├── globals.css              # Estilos globais e variáveis CSS
│   ├── layout.tsx               # Layout principal da aplicação
│   ├── loading.tsx              # Componente de loading
│   ├── page.tsx                 # Página inicial (redireciona para dashboard)
│   ├── dashboard/               # Página do dashboard principal
│   ├── projects/                # Gerenciamento de projetos
│   ├── tests/                   # Gerenciamento de testes
│   └── reports/                 # Relatórios e analytics
├── components/                   # Componentes reutilizáveis
│   ├── ui/                      # Componentes base do sistema de design
│   ├── navigation.tsx           # Componente de navegação principal
│   ├── code-editor.tsx          # Editor de código para testes
│   └── theme-provider.tsx       # Provedor de temas
├── hooks/                       # (removido - hooks duplicados)
├── lib/                         # Utilitários e configurações
├── public/                      # Arquivos estáticos
├── styles/                      # Estilos adicionais
└── ...                         # Arquivos de configuração
```

## 🎨 Sistema de Design

### Temas

O projeto utiliza um sistema de temas avançado que permite:

- **Modo Claro**: Interface clara e moderna
- **Modo Escuro**: Interface escura para reduzir fadiga visual
- **Modo Híbrido**: Elementos principais (cards, métricas, menus) sempre em modo claro, independentemente do tema

### Componentes

- Cards informativos com métricas
- Tabelas de dados responsivas
- Gráficos interativos
- Formulários com validação
- Modais e diálogos
- Sistema de navegação intuitivo

### Cores e Tipografia

- Paleta de cores consistente baseada em HSL
- Tipografia legível e hierarquizada
- Ícones consistentes do Lucide React
- Estados visuais claros (sucesso, erro, aviso, info)

## 🔧 Configuração e Personalização

### Variáveis CSS

O sistema de cores é baseado em custom properties CSS que podem ser facilmente customizadas:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --card: 0 0% 100%;
  --primary: 0 0% 9%;
  /* ... outras variáveis */
}
```

### Componentes Customizáveis

Todos os componentes utilizam o padrão de design tokens, permitindo fácil customização através de classes Tailwind e variantes.

## 🎯 Funcionalidades Detalhadas

### Dashboard

- Métricas principais (total de testes, taxa de sucesso, tempo médio)
- Projetos ativos com status em tempo real
- Atividade recente com filtros
- Ações rápidas para funcionalidades principais

### Projetos

- Lista completa de projetos
- Métricas individuais por projeto
- Status de execução em tempo real
- Filtros por status, nome e período

### Testes

- Biblioteca organizada de casos de teste
- **Editor de código avançado** com recursos profissionais:
  - **Análise Sintática**: Highlighting para JavaScript/TypeScript e Playwright
  - **Análise Léxica**: Tokenização inteligente de keywords, métodos e literais
  - **Análise Semântica**: Detecção de erros, anti-padrões e sugestões de melhoria
  - **Auto-Complete**: Sugestões contextuais com snippets de código
  - **Quick Fixes**: Correções automáticas e dicas de otimização
  - **Interface VS Code**: Design profissional com tema dark
  - **Painel de Problemas**: Categorização de erros, avisos e sugestões
- Execução individual ou em lote
- Histórico detalhado de execuções
- Logs e resultados detalhados

### Relatórios

- Análises de tendências temporais
- Métricas de performance
- Gráficos interativos
- Exportação em múltiplos formatos
- Resumo executivo para stakeholders

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use TypeScript para tipagem
- Siga as convenções do ESLint
- Utilize nomes descritivos para componentes e funções
- Mantenha componentes pequenos e focados
- Documente funcionalidades complexas

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Para dúvidas, sugestões ou reportar problemas:

1. Abra uma issue no GitHub
2. Consulte a documentação dos componentes
3. Verifique os exemplos na pasta de componentes

## 🎯 Roadmap

- [ ] Integração com CI/CD
- [ ] API para execução remota de testes
- [ ] Sistema de notificações em tempo real
- [ ] Integração com ferramentas populares de teste
- [ ] Dashboard móvel nativo
- [ ] Sistema de plugins
- [ ] Inteligência artificial para análise de falhas
- [x] **Editor de código avançado com análise sintática, léxica e semântica**
- [x] **Auto-complete inteligente para Playwright**
- [x] **Sistema de detecção de erros e sugestões em tempo real**

---

## 📚 Documentação Adicional

- [`EDITOR_FEATURES.md`](./EDITOR_FEATURES.md) - Documentação completa das funcionalidades do editor de código

---

**Test Automation Hub** - Simplificando a automação de testes para equipes modernas! 🚀
