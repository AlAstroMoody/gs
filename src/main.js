import { createApp } from 'vue'
import { initYandexMetrika } from 'yandex-metrika-vue3'

import App from '@/App.vue'
import router from '@/router'
import '@/assets/css/_base.css'
import '@/assets/css/tailwind.css'

const app = createApp(App)
app
  .use(router)
  .use(initYandexMetrika, { id: 89703948, router: router })
  .mount('#app')
