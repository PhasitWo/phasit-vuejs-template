<script setup lang="ts">
import noCoverImg from '@/assets/no_cover_img.jpg'
import type { Book } from '@/store/modules/library'
import { ref, watch } from 'vue'
import { useStore } from '@/store'
import Swal from 'sweetalert2'

const props = defineProps<{ modelValue: boolean; book: Book | null; mode: 'add' | 'remove' }>()
const emit = defineEmits(['update:modelValue'])

const store = useStore()

// state
const currentBook = ref<Book | null>(null)
const canAdd = ref(true)

// method
const handleAdd = async () => {
  if (!currentBook.value) return
  await store.dispatch('addWatchlist', currentBook)
  handleClose()
  Swal.fire({
    title: 'Added to watchlist',
    icon: 'success',
    confirmButtonColor: 'green',
    customClass: {
      confirmButton: 'custom-confirm-btn',
    },
  })
}
const handleRemove = async () => {
  if (!currentBook.value) return
  await store.dispatch('removeFromWatchlist', currentBook.value!.key)
  handleClose()
  Swal.fire({
    title: 'Removed from watchlist',
    icon: 'success',
    confirmButtonColor: 'green',
    customClass: {
      confirmButton: 'custom-confirm-btn',
    },
  })
}
const handleClose = () => emit('update:modelValue', false)

// watcher
watch(props, async () => {
  currentBook.value = props.book
  const found = store.state.library.watchlist.find((v) => v.key === currentBook.value?.key)
  canAdd.value = found === undefined
})
</script>

<template>
  <v-dialog width="600" :model-value="props.modelValue">
    <v-card>
      <v-container>
        <v-row
          ><v-col cols="6">
            <v-img
              :src="
                book?.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg`
                  : noCoverImg
              "
            /> </v-col
          ><v-col cols="6">
            <div>
              <h2 style="margin-bottom: 10px">{{ book?.title }}</h2>
              <div><span class="bold">First Published:</span> {{ book?.first_publish_year }}</div>
              <div><span class="bold">Authors:</span> {{ book?.author_name.join(', ') }}</div>
            </div></v-col
          ></v-row
        >
      </v-container>
      <v-spacer></v-spacer>
      <template v-slot:actions>
        <v-btn v-if="props.mode == 'remove'" @click="handleRemove" color="warning">
          REMOVE FROM WATCHLIST
        </v-btn>
        <v-btn v-else @click="handleAdd" :disabled="!canAdd" color="success">
          ADD TO WATCHLIST
        </v-btn>
        <v-btn @click="handleClose" color="error"> Close </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.bold {
  font-weight: bold;
}
</style>
