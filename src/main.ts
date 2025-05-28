import { createApp, type InjectionKey } from 'vue'
import App from './App.vue'
import router from './router'
import Baseline from '@/layouts/Baseline.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { storePlugin } from '@/store'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import { GrowthBook } from '@growthbook/growthbook'
import { reactive } from 'vue'
// Create a reactive instance of GrowthBook
const gbInstance = reactive(
  new GrowthBook({
    apiHost: "https://cdn.growthbook.io",
    clientKey: import.meta.env.VITE_GB_CLIENT_KEY,
    attributes: {
      // Add user attributes here
    },
    enableDevMode: true, // Optional: Enable the Visual Editor and dev tools
  }),
)

// Share the provider type with other components
export const gbKey = Symbol('gb') as InjectionKey<typeof gbInstance | null>

const initializeGrowthBook = async () => {
  try {
    await gbInstance.init({ streaming: true })
    return gbInstance
  } catch (e) {
    console.error('Error initializing GrowthBook:', e)
    return null
  }
}

initializeGrowthBook().then((gbInstance) => {
  const app = createApp(App)
  app.provide(gbKey, gbInstance)

  app.use(router)
  const vuetify = createVuetify({ icons: { defaultSet: 'mdi', aliases, sets: { mdi } } })
  app.use(vuetify)
  app.use(storePlugin)
  app.component('Baseline', Baseline)
  app.mount('#app')
})
