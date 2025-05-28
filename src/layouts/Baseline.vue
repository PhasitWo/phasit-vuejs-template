<script setup lang="ts">
import { useStore } from '@/store'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const links = [
  ['mdi-bookshelf', 'Library', '/'],
  ['mdi-archive-clock', 'Watchlist', '/watchlist'],
  ['mdi-home', 'Home', '/home'],
  ['mdi-information', 'About', '/about'],
]
const drawer = ref(true)
const route = useRouter()
const store = useStore()
</script>

<template>
  <v-navigation-drawer v-model="drawer">
    <v-divider></v-divider>
    <v-list>
      <v-list-item
        v-for="[icon, text, path] in links"
        :key="icon"
        :prepend-icon="icon"
        :title="text"
        link
        :to="path"
        :color="store.state.gb.isRed ? 'error' : 'success'"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar style="padding-left: 15px">
    <v-icon icon="mdi-menu" @click="drawer = !drawer" :color="store.state.gb.isRed ? 'error' : 'success'"></v-icon>
    <v-app-bar-title>{{ route.currentRoute.value.meta.title || 'NO TITLE' }}</v-app-bar-title>
  </v-app-bar>
  <slot />
</template>
