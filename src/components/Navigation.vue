<script setup lang="ts">
defineOptions({ name: 'AppNavigation' })
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Button from './ui/Button.vue'
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  TestTube,
  Sun,
  Moon,
  Settings,
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const isDark = ref(false)

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, current: false },
  { name: 'Projetos', href: '/projects', icon: FolderOpen, current: false },
  { name: 'Relatórios', href: '/reports', icon: FileText, current: false },
  { name: 'Testes', href: '/tests', icon: TestTube, current: false },
]

const isCurrentRoute = (href: string) => {
  if (href === '/' && route.name === 'dashboard') return true
  return route.path === href
}

const navigateTo = (href: string) => {
  router.push(href)
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  // Adicionar lógica para aplicar o tema ao documento
  //...
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-background px-6 pb-4">
        <!-- Name App -->
        <div className="flex h-16 shrink-0 items-center">
          <h1 className="text-xl font-bold">Test Automation Hub</h1>
        </div>

        <!-- Menus -->
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <Button
                    :class="[
                      'flex items-center gap-x-3 w-full text-left',
                      { 'bg-accent text-accent-foreground': isCurrentRoute(item.href) },
                    ]"
                    @click="navigateTo(item.href)"
                  >
                    <component :is="item.icon" class="h-6 w-6" />
                    <span class="text-sm font-medium">{{ item.name }}</span>
                  </Button>
                </li>
              </ul>
            </li>

            <!-- Footer Nav Bar -->
            <li className="mt-auto">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" @click="toggleTheme">
                  <Sun
                    v-if="!isDark"
                    class="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                  />
                  <Moon
                    v-else
                    class="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                  />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings class="h-4 w-4" />
                </Button>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
