import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'
import '@/assets/css/_base.css'
import '@/assets/css/tailwind.css'
import 'flowbite'

const app = createApp(App)
app.use(router).mount('#app')
