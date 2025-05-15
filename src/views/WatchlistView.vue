<script setup lang="ts">
import { useStore } from '@/store'
import { computed, onMounted, ref } from 'vue'
import noCoverImg from '@/assets/no_cover_img.jpg'
import type { Book } from '@/store/modules/library'
import BookDetailDialog from '@/components/BookDetailDialog.vue'

const store = useStore()

// state
const showDialog = ref(false)
const selectedBook = ref<Book | null>(null)

// computed
const items = computed(() => store.state.library.watchlist)
onMounted(async () => {
  await store.dispatch('fetchWatchlist')
})

// method
const handleImgClick = async (target: Book) => {
  showDialog.value = true
  selectedBook.value = target
}
</script>

<template>
  <v-container style="padding-bottom: 100px">
    <v-row justify="center" justify-md="start">
      <v-col v-for="(item, index) in items" :key="index" cols="5" md="2" v-if="items.length > 0">
        <v-hover>
          <template v-slot="{ isHovering, props }">
            <div
              v-bind="props"
              :class="{ active: isHovering, bookContainer: true }"
              style="transition: transform 0.7s"
            >
              <v-img
                :src="
                  item.cover_i
                    ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
                    : noCoverImg
                "
                min-height="250"
                width="350"
                @click="() => handleImgClick(item)"
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
      <span style="margin-top: 30px;" v-else>No Watchlist</span>
    </v-row>
  </v-container>
  <BookDetailDialog v-model="showDialog" :book="selectedBook" mode="remove" />
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
</style>
