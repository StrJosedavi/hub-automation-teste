<script setup lang="ts">
defineOptions({ name: 'DashboardView' })
import { ref } from 'vue'
import Navigation from '../components/Navigation.vue'
import Card from '../components/ui/Card.vue'
import CardContent from '../components/ui/CardContent.vue'
import CardHeader from '../components/ui/CardHeader.vue'
import CardTitle from '../components/ui/CardTitle.vue'
import { Activity } from 'lucide-vue-next'

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
    </div>

    <!-- Métricas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card class="dashboard-metrics">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium"> Total de Testes </CardTitle>
          <Activity class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ metrics.totalTests }}</div>
          <p class="text-xs text-muted-foreground">{{ metrics.testsToday }} executados hoje</p>
        </CardContent>
      </Card>
    </div>
  </Navigation>
</template>
