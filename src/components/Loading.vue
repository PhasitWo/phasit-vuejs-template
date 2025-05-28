<script setup lang="ts">
import { useStore } from '@/store';

const store = useStore()
</script>

<template>
  <div class="loading">
    <v-progress-circular
      :size="70"
      :width="7"
      :color="store.state.gb.isRed ? 'error' : 'success'"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
