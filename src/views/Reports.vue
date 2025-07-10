<template>
  <div class="min-h-screen bg-background">
    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 min-h-screen bg-card border-r">
        <div class="p-6">
          <h1 class="text-2xl font-bold">Hub Automation</h1>
        </div>
        <nav class="px-6">
          <div class="space-y-2">
            <router-link
              to="/"
              class="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              Dashboard
            </router-link>
            <router-link
              to="/projects"
              class="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              Projetos
            </router-link>
            <router-link
              to="/tests"
              class="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              Testes
            </router-link>
            <router-link
              to="/reports"
              class="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground bg-accent text-accent-foreground"
            >
              Relatórios
            </router-link>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <div class="space-y-6">
          <div>
            <h1 class="text-3xl font-bold">Relatórios</h1>
            <p class="text-muted-foreground">Análise e métricas dos seus testes</p>
          </div>

          <!-- Metrics Summary -->
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div class="rounded-lg border bg-card p-6">
              <h3 class="text-sm font-medium">Taxa de Sucesso Geral</h3>
              <div class="text-2xl font-bold">95.6%</div>
              <p class="text-xs text-muted-foreground">Últimos 30 dias</p>
            </div>

            <div class="rounded-lg border bg-card p-6">
              <h3 class="text-sm font-medium">Tempo Médio de Execução</h3>
              <div class="text-2xl font-bold">2.3min</div>
              <p class="text-xs text-muted-foreground">Por suite de teste</p>
            </div>

            <div class="rounded-lg border bg-card p-6">
              <h3 class="text-sm font-medium">Testes Executados</h3>
              <div class="text-2xl font-bold">1,234</div>
              <p class="text-xs text-muted-foreground">Este mês</p>
            </div>

            <div class="rounded-lg border bg-card p-6">
              <h3 class="text-sm font-medium">Bugs Encontrados</h3>
              <div class="text-2xl font-bold">23</div>
              <p class="text-xs text-muted-foreground">Este mês</p>
            </div>
          </div>

          <!-- Recent Reports -->
          <div class="rounded-lg border bg-card p-6">
            <h3 class="text-lg font-semibold mb-4">Relatórios Recentes</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p class="font-medium">Relatório Semanal - E-commerce</p>
                  <p class="text-sm text-muted-foreground">Gerado em 08/07/2025</p>
                </div>
                <button
                  class="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                >
                  Baixar
                </button>
              </div>

              <div class="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p class="font-medium">Análise de Performance - API</p>
                  <p class="text-sm text-muted-foreground">Gerado em 07/07/2025</p>
                </div>
                <button
                  class="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                >
                  Baixar
                </button>
              </div>

              <div class="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p class="font-medium">Relatório de Cobertura</p>
                  <p class="text-sm text-muted-foreground">Gerado em 05/07/2025</p>
                </div>
                <button
                  class="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                >
                  Baixar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// Reports page logic
</script>
