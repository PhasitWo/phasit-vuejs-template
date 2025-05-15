<script setup lang="ts">
import { useStore } from '@/store'
import { computed, onMounted, ref } from 'vue'
import Loading from '@/components/Loading.vue'
import type { SearchParams } from '@/store/modules/library'

onMounted(async () => {
  store.dispatch('toggleLoading')
  await store.dispatch('getBookList')
  store.dispatch('toggleLoading')
})

const store = useStore()
const searchText = ref('')
const items = computed(() => store.state.library.bookList.items)

const rule = (value: string) => {
  if (value) return true
  return 'required'
}
const handleSearch = async () => {
  if (!searchText.value.trim()) return
  const params: SearchParams = { itemPerPage: 100, page: 1, query: searchText.value }
  store.dispatch('toggleLoading')
  await store.dispatch('getBookList', params)
  store.dispatch('toggleLoading')
}
</script>

<template>
  <v-container>
    <v-row style="padding-left: 10px">
      <v-col cols="5" align-self="center">
        <v-form fast-fail @submit.prevent="handleSearch" validate-on="submit">
          <v-text-field v-model="searchText" label="Search" variant="underlined" :rules="[rule]" />
          <v-btn type="submit" icon="mdi-magnify" color="error" size="small"></v-btn
        ></v-form>
      </v-col> </v-row
  ></v-container>
  <Loading v-if="store.state.isLoading" />
  <v-container style="padding-bottom: 100px" v-else>
    <v-row>
      <v-col v-for="item in items" :key="item.cover_i" cols="2">
        <v-hover>
          <template v-slot="{ isHovering, props }">
            <div
              v-bind="props"
              :class="{ active: isHovering, bookContainer: true }"
              style="transition: transform 0.7s"
            >
              <v-img
                :src="`https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`"
                height="350"
                width="350"
              >
                <template v-slot:error>
                  <span>No Cover Image</span>
                </template>
              </v-img>
              <span class="title">{{ item.title }}</span>
            </div>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.active {
  transform: scale(1.35);
  z-index: 1000;
}
.title {
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
}
.bookContainer {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
}
form {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
