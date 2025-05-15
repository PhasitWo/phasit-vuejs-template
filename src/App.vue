<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()
const layout = computed(() => router.currentRoute.value.meta.layout || 'div')
</script>

<template>
    <v-app>
      <component :is="layout">
        <v-main>
          <RouterView />
        </v-main>
      </component>
    </v-app>
</template>
