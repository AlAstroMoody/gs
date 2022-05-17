import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import '@/assets/scss/_base.scss'
import '@/assets/scss/tailwind.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
