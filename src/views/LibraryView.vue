<script setup lang="ts">
import { useStore } from '@/store'
import { computed, onMounted } from 'vue'
import Loading from '@/components/Loading.vue'

const store = useStore()
const items = computed(() => store.state.library.bookList.items)
onMounted(() => {
  store.dispatch('getBookList')
})
</script>

<template>
  <Loading v-if="store.state.isLoading" />
  <v-container v-else>
    <v-row>
      <v-col v-for="item in items" :key="item.cover_i" cols="2">
        <v-sheet>
          <v-img
            :src="`https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`"
            height="300"
            width="150"
            cover
          >
            <template v-slot:error>
              <span>No Cover Image</span>
            </template>
          </v-img>
          <span>{{ item.title }}</span>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
