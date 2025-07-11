<script setup lang="ts">
defineOptions({ name: 'ProjectsView' })
import { ref, computed } from 'vue'
import Navigation from '../components/Navigation.vue'
import Button from '../components/ui/Button.vue'
import Card from '../components/ui/Card.vue'
import CardContent from '../components/ui/CardContent.vue'
import CardHeader from '../components/ui/CardHeader.vue'
import CardTitle from '../components/ui/CardTitle.vue'
import Badge from '../components/ui/Badge.vue'
import {
  Plus,
  MoreHorizontal,
  Globe,
  Smartphone,
  Monitor,
  Activity,
  CheckCircle,
  XCircle,
  Target,
} from 'lucide-vue-next'

interface Project {
  id: string
  name: string
  description: string
  url: string
  environment: 'production' | 'staging' | 'development'
  totalTests: number
  passedTests: number
  failedTests: number
  lastRun: string
  status: 'active' | 'inactive'
  type: 'web' | 'mobile' | 'api'
}

const projects = ref<Project[]>([
  {
    id: '1',
    name: 'E-commerce Web',
    description:
      'Sistema de e-commerce principal com funcionalidades de carrinho, pagamento e gerenciamento de produtos',
    url: 'https://ecommerce.example.com',
    environment: 'production',
    totalTests: 45,
    passedTests: 40,
    failedTests: 5,
    lastRun: '2 horas atrás',
    status: 'active',
    type: 'web',
  },
  {
    id: '2',
    name: 'Mobile App iOS',
    description: 'Aplicativo móvel para iOS com funcionalidades nativas e integração com backend',
    url: 'app://ios-app',
    environment: 'staging',
    totalTests: 28,
    passedTests: 26,
    failedTests: 2,
    lastRun: '1 dia atrás',
    status: 'active',
    type: 'mobile',
  },
  {
    id: '3',
    name: 'API Gateway',
    description: 'Gateway de APIs com autenticação, rate limiting e monitoramento',
    url: 'https://api.example.com',
    environment: 'production',
    totalTests: 67,
    passedTests: 62,
    failedTests: 5,
    lastRun: '30 min atrás',
    status: 'active',
    type: 'api',
  },
  {
    id: '4',
    name: 'Admin Dashboard',
    description: 'Painel administrativo para gerenciamento de usuários e configurações',
    url: 'https://admin.example.com',
    environment: 'development',
    totalTests: 18,
    passedTests: 15,
    failedTests: 3,
    lastRun: '3 dias atrás',
    status: 'inactive',
    type: 'web',
  },
])

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'web':
      return Globe
    case 'mobile':
      return Smartphone
    case 'api':
      return Monitor
    default:
      return Globe
  }
}

const getEnvironmentBadge = (environment: string) => {
  const variants = {
    production: 'default' as const,
    staging: 'secondary' as const,
    development: 'outline' as const,
  }
  return variants[environment as keyof typeof variants]
}

const getSuccessRate = (project: Project) => {
  if (project.totalTests === 0) return 0
  return Math.round((project.passedTests / project.totalTests) * 100)
}

const totalStats = computed(() => {
  return projects.value.reduce(
    (acc, project) => ({
      totalTests: acc.totalTests + project.totalTests,
      passedTests: acc.passedTests + project.passedTests,
      failedTests: acc.failedTests + project.failedTests,
      activeProjects: acc.activeProjects + (project.status === 'active' ? 1 : 0),
    }),
    { totalTests: 0, passedTests: 0, failedTests: 0, activeProjects: 0 },
  )
})

const handleCreateProject = () => {
  console.log('Criar novo projeto')
}

// Funções para uso futuro (não implementadas ainda)
// const handleEditProject = (project: Project) => {
//   console.log('Editar projeto:', project.name)
// }

// const handleViewTests = (project: Project) => {
//   console.log('Visualizar testes:', project.name)
// }

// const handleDeleteProject = (projectId: string) => {
//   console.log('Excluir projeto:', projectId)
// }
</script>

<template>
  <Navigation>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold">Projetos</h1>
          <p class="text-muted-foreground">Gerencie seus projetos de teste e ambientes</p>
        </div>
        <Button @click="handleCreateProject">
          <Plus class="w-4 h-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      <!-- Estatísticas Gerais -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card class="projects-metrics">
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Projetos Ativos</CardTitle>
            <Activity class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              {{ totalStats.activeProjects }}
            </div>
            <p class="text-xs text-muted-foreground">de {{ projects.length }} total</p>
          </CardContent>
        </Card>

        <Card class="projects-metrics">
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Total de Testes</CardTitle>
            <Target class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ totalStats.totalTests }}</div>
            <p class="text-xs text-muted-foreground">em todos os projetos</p>
          </CardContent>
        </Card>

        <Card class="projects-metrics">
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Testes Aprovados</CardTitle>
            <CheckCircle class="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold text-green-600">
              {{ totalStats.passedTests }}
            </div>
            <p class="text-xs text-muted-foreground">
              {{
                totalStats.totalTests > 0
                  ? Math.round((totalStats.passedTests / totalStats.totalTests) * 100)
                  : 0
              }}% de sucesso
            </p>
          </CardContent>
        </Card>

        <Card class="projects-metrics">
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Testes Falharam</CardTitle>
            <XCircle class="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold text-red-600">
              {{ totalStats.failedTests }}
            </div>
            <p class="text-xs text-muted-foreground">requerem atenção</p>
          </CardContent>
        </Card>
      </div>

      <!-- Lista de Projetos -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card v-for="project in projects" :key="project.id" class="relative project-card">
          <CardHeader>
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-2">
                <component :is="getTypeIcon(project.type)" class="w-4 h-4" />
                <div>
                  <CardTitle class="text-lg">{{ project.name }}</CardTitle>
                  <div class="flex items-center gap-2 mt-1">
                    <Badge :variant="getEnvironmentBadge(project.environment)">
                      {{ project.environment }}
                    </Badge>
                    <Badge :variant="project.status === 'active' ? 'default' : 'secondary'">
                      {{ project.status }}
                    </Badge>
                  </div>
                </div>
              </div>
              <div class="relative">
                <Button variant="ghost" size="sm">
                  <MoreHorizontal class="w-4 h-4" />
                </Button>
                <!-- Dropdown menu would go here -->
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground mb-4">
              {{ project.description }}
            </p>

            <div class="space-y-3">
              <div class="flex justify-between text-sm">
                <span>Testes: {{ project.totalTests }}</span>
                <span class="text-green-600"> {{ project.passedTests }} passaram </span>
              </div>
              <div class="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  class="h-full bg-green-500 transition-all"
                  :style="{ width: `${getSuccessRate(project)}%` }"
                />
              </div>

              <div class="flex justify-between items-center text-sm">
                <span class="text-muted-foreground">Última execução</span>
                <span>{{ project.lastRun }}</span>
              </div>

              <div class="pt-2 border-t">
                <div class="flex items-center gap-2 text-xs text-muted-foreground">
                  <Globe class="w-3 h-3" />
                  <span class="truncate">{{ project.url }}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </Navigation>
</template>
