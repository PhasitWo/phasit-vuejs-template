import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Baseline from '@/layouts/Baseline.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css';
import { storePlugin } from '@/store'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const app = createApp(App)

app.use(router)
const vuetify = createVuetify({ icons: { defaultSet: 'mdi', aliases, sets: { mdi } } })
app.use(vuetify)
app.use(storePlugin)
app.component('Baseline', Baseline)

app.mount('#app')
