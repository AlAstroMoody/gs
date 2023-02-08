import { createApp } from 'vue'
import Vue3Resize from 'vue3-resize'

import App from '@/App.vue'
import router from '@/router'
import '@/assets/css/_base.css'
import '@/assets/css/tailwind.css'
import 'flowbite'

const app = createApp(App)
app.use(router).use(Vue3Resize).mount('#app')
