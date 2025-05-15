<script setup lang="ts">
import { useStore } from '@/store'
import { computed, onMounted, ref } from 'vue'
import Loading from '@/components/Loading.vue'
import type { Book, SearchParams } from '@/store/modules/library'
import type { VInfiniteScroll } from 'vuetify/lib/components/VInfiniteScroll/VInfiniteScroll.mjs'
import noCoverImg from '@/assets/no_cover_img.jpg'
import BookDetailDialog from '@/components/BookDetailDialog.vue'

const store = useStore()
// state
const searchText = ref('harry potter')
const itemPerPage = ref(6)
const showDialog = ref(false)
const selectedBook = ref<Book | null>(null)

// computed
const params = computed<SearchParams>(() => ({
  query: searchText.value,
  itemPerPage: itemPerPage.value,
}))
const items = computed(() => store.state.library.bookList.items)

// method
const rule = (value: string) => {
  if (value) return true
  return 'required'
}
const handleSearch = async () => {
  if (!searchText.value.trim()) return
  itemPerPage.value = 6
  store.dispatch('toggleLoading')
  await store.dispatch('fetchBookList', params.value)
  store.dispatch('toggleLoading')
}
const load: VInfiniteScroll['onLoad'] = async ({ done }) => {
  itemPerPage.value = itemPerPage.value + 6
  const oldLength = store.state.library.bookList.items.length
  await store.dispatch('fetchBookList', params.value)
  const curLength = store.state.library.bookList.items.length
  if (oldLength === curLength) {
    done('empty')
    return
  }
  done('ok')
}

const handleImgClick = async (target: Book) => {
  showDialog.value = true
  selectedBook.value = target
}

onMounted(async () => {
  store.dispatch('toggleLoading')
  await store.dispatch('fetchBookList', params.value)
  store.dispatch('toggleLoading')
})
</script>

<template>
  <v-container style="padding: 20px 0px 0px 10px">
    <v-row style="padding-left: 10px">
      <v-col cols="5" align-self="center">
        <v-form fast-fail @submit.prevent="handleSearch" validate-on="submit">
          <v-text-field v-model="searchText" label="Search" variant="underlined" :rules="[rule]" />
          <v-btn type="submit" icon="mdi-magnify" color="error" size="small"></v-btn
        ></v-form>
      </v-col> </v-row
  ></v-container>
  <Loading v-if="store.state.isLoading" />
  <v-infinite-scroll direction="vertical" :items="items" @load="load" v-else>
    <v-container style="padding-bottom: 100px">
      <v-row>
        <v-col v-for="(item, index) in items" :key="index" cols="2">
          <v-hover>
            <template v-slot="{ isHovering, props }">
              <div
                v-bind="props"
                :class="{ active: isHovering, bookContainer: true }"
                style="transition: transform 0.7s"
                @click="() => handleImgClick(item)"
              >
                <v-img
                  :src="
                    item.cover_i
                      ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
                      : noCoverImg
                  "
                  min-height="250"
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
    <BookDetailDialog v-model="showDialog" :book="selectedBook" mode="add"/>
  </v-infinite-scroll>
</template>

<style scoped>
.active {
  transform: scale(1.1);
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
