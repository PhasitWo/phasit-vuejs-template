<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
  const links = [
    ['mdi-inbox-arrow-down', 'Home', "/"],
    ['mdi-send', 'About', "/about"],
    ['mdi-send', 'Library', "/library"],
  ]
const drawer = ref(true)
const route = useRouter()
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
        ></v-list-item>
      </v-list>
  </v-navigation-drawer>

  <v-app-bar style="padding-left: 15px;">
    <v-icon icon="$vuetify" @click="drawer = !drawer" color="error"></v-icon>
    <v-app-bar-title>{{ route.currentRoute.value.meta.title || "NO TITLE" }}</v-app-bar-title>
  </v-app-bar>
  <slot />
</template>
