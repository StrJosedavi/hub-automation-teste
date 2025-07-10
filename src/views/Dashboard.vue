<script setup lang="ts">
import { ref } from 'vue'
import Navigation from '../components/Navigation.vue'
import { Button } from '../components/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui'
import { Activity, CheckCircle, XCircle, TrendingUp, TrendingDown, Target } from 'lucide-vue-next'

const metrics = ref({
  totalTests: 156,
  passedTests: 142,
  failedTests: 8,
  pendingTests: 6,
  successRate: 91.2,
  failureRate: 5.1,
  avgExecutionTime: 2.4,
  testsToday: 45,
  activeProjects: 3,
})

const recentActivity = ref([
  {
    id: '1',
    type: 'test_completed',
    message: 'Login Flow Test executado com sucesso',
    time: '2 min atrás',
    status: 'success' as const,
  },
  {
    id: '2',
    type: 'test_failed',
    message: 'Checkout Process falhou na verificação de pagamento',
    time: '15 min atrás',
    status: 'error' as const,
  },
  {
    id: '3',
    type: 'project_created',
    message: "Novo projeto 'Mobile App Android' criado",
    time: '1 hora atrás',
    status: 'info' as const,
  },
])
</script>

<template>
  <Navigation>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold">Dashboard</h1>
          <p class="text-muted-foreground">Visão geral do hub de automação de testes</p>
        </div>
      </div>

      <!-- Métricas Principais -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card class="dashboard-metrics">
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Total de Testes</CardTitle>
            <Activity class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ metrics.totalTests }}</div>
            <p class="text-xs text-muted-foreground">{{ metrics.testsToday }} executados hoje</p>
          </CardContent>
        </Card>

        <Card class="dashboard-metrics">
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Taxa de Sucesso</CardTitle>
            <Target class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold text-green-600">{{ metrics.successRate }}%</div>
            <div class="relative h-2 w-full overflow-hidden rounded-full bg-secondary mt-2">
              <div
                class="h-full bg-green-500 transition-all"
                :style="{ width: `${metrics.successRate}%` }"
              />
            </div>
          </CardContent>
        </Card>

        <Card class="dashboard-metrics">
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Testes Aprovados</CardTitle>
            <CheckCircle class="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold text-green-600">
              {{ metrics.passedTests }}
            </div>
            <div class="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp class="w-3 h-3" />
              +5% desde ontem
            </div>
          </CardContent>
        </Card>

        <Card class="dashboard-metrics">
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Testes Falharam</CardTitle>
            <XCircle class="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold text-red-600">
              {{ metrics.failedTests }}
            </div>
            <div class="relative h-2 w-full overflow-hidden rounded-full bg-secondary mt-2">
              <div
                class="h-full bg-red-500 transition-all"
                :style="{ width: `${metrics.failureRate}%` }"
              />
            </div>
            <div class="flex items-center gap-1 text-xs text-red-600 mt-1">
              <TrendingDown class="w-3 h-3" />
              -2 desde ontem
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Status dos Projetos -->
      <Card class="dashboard-project-card">
        <CardHeader>
          <div class="flex items-center justify-between">
            <div>
              <CardTitle>Projetos Ativos</CardTitle>
              <CardDescription>Status dos seus projetos de teste</CardDescription>
            </div>
            <Button variant="outline" @click="$router.push('/projects')"> Ver Todos </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 border rounded-lg dashboard-project-item">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-medium">E-commerce Web</h3>
                <Badge variant="default">Ativo</Badge>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span>Testes: 45</span>
                  <span class="text-green-600">40 passaram</span>
                </div>
                <div class="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div class="h-full bg-green-500 transition-all" style="width: 88.9%" />
                </div>
              </div>
            </div>

            <div class="p-4 border rounded-lg dashboard-project-item">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-medium">Mobile App</h3>
                <Badge variant="secondary">Staging</Badge>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span>Testes: 28</span>
                  <span class="text-green-600">26 passaram</span>
                </div>
                <div class="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div class="h-full bg-green-500 transition-all" style="width: 92.9%" />
                </div>
              </div>
            </div>

            <div class="p-4 border rounded-lg dashboard-project-item">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-medium">Admin Dashboard</h3>
                <Badge variant="outline">Dev</Badge>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span>Testes: 18</span>
                  <span class="text-green-600">16 passaram</span>
                </div>
                <div class="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div class="h-full bg-green-500 transition-all" style="width: 88.9%" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Atividade Recente -->
      <div class="grid grid-cols-1 gap-6">
        <Card class="dashboard-recent-activity">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimas execuções e eventos</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div
                v-for="activity in recentActivity"
                :key="activity.id"
                class="flex items-start gap-3 dashboard-activity-item"
              >
                <div
                  :class="[
                    'mt-1 w-2 h-2 rounded-full',
                    activity.status === 'success'
                      ? 'bg-green-500'
                      : activity.status === 'error'
                        ? 'bg-red-500'
                        : 'bg-blue-500',
                  ]"
                />
                <div class="flex-1 space-y-1">
                  <p class="text-sm">{{ activity.message }}</p>
                  <p class="text-xs text-muted-foreground">
                    {{ activity.time }}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </Navigation>
</template>
