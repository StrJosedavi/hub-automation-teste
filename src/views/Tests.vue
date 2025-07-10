<script setup lang="ts">
import Navigation from '../components/Navigation.vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui'
</script>

<template>
  <Navigation>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold">Testes</h1>
          <p class="text-muted-foreground">Execute e monitore seus testes automatizados</p>
        </div>
      </div>

      <!-- Placeholder content -->
      <Card>
        <CardHeader>
          <CardTitle>Testes</CardTitle>
          <CardDescription>Em desenvolvimento...</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-muted-foreground">Esta página será implementada em seguida.</p>
        </CardContent>
      </Card>
    </div>
  </Navigation>
</template>
