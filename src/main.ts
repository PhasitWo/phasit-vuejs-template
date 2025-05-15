import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Baseline from '@/layouts/Baseline.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { storePlugin } from '@/store'

const app = createApp(App)

app.use(router)
const vuetify = createVuetify()
app.use(vuetify)
app.use(storePlugin)
app.component('Baseline', Baseline)

app.mount('#app')
