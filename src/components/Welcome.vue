<script setup lang="ts">
import { computed, reactive, watch } from 'vue'

defineProps({
  text: { type: String, required: true },
})
// data
const state = reactive<{ counter: number; history: string[] }>({ counter: 0, history: [] })

// method
const increment = () => {
  state.counter++
}

// computed
const display = computed(() => `text ${state.counter}`)

// watcher
watch(
  () => state.counter,
  (newValue) => {
    state.history.push(`press ADD ${newValue} times`)
  },
)
</script>
<template>
  <h1>{{ display }}</h1>
  <v-btn @click="increment">ADD</v-btn>
  <li v-for="item in state.history">
    {{ item }}
  </li>
</template>
