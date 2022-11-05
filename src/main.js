import { createApp } from 'vue'
import store from '@/stores/tasks'
import App from './App.vue'
import '@/assets/css/main.css'

const app = createApp(App)

app.use(store)

app.mount('#app')
