<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useStore } from './store'

const router = useRouter()
const store = useStore()
const layout = computed(() => router.currentRoute.value.meta.layout || 'div')

onMounted(() => {
  store.dispatch("fetchWatchlist")
})
</script>

<template>
    <v-app style="overflow-x: hidden;">
      <component :is="layout">
        <v-main>
          <RouterView />
        </v-main>
      </component>
    </v-app>
</template>

<style>
.custom-confirm-btn {
  color: white !important
}
</style>