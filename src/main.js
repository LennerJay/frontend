import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import storeReset from './stores/plugins/storeReset'
// import { useAuthStore } from './stores/auth'

const app = createApp(App)

const pinia = createPinia()
pinia.use(storeReset)
app.use(router)
app.use(pinia)

// app.provide('authStore',useAuthStore())

app.mount('#app')
