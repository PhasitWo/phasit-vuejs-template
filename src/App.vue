<script setup lang="ts">
import { inject, computed, onMounted, watch, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useStore } from './store'
import { gbKey } from './main'

const router = useRouter()
const store = useStore()
const layout = computed(() => router.currentRoute.value.meta.layout || 'div')

onMounted(() => {
  store.dispatch('fetchWatchlist')
})
// Inject the GrowthBook instance
const growthbook = inject(gbKey)

if (growthbook) {
  watch(growthbook, () => {
    const val = growthbook?.isOn('is-red');
    console.log('is-red', val)
    store.dispatch('setIsRed', val);
  }, {immediate: true})
} else {
  console.error("HEY")
}
</script>

<template>
  <v-app style="overflow-x: hidden">
    <component :is="layout">
      <v-main>
        <RouterView />
      </v-main>
    </component>
  </v-app>
</template>

<style>
.custom-confirm-btn {
  color: white !important;
}
</style>
