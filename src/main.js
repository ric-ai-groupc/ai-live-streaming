import { createApp } from 'vue'
import Home from './components/Home.vue'
import './assets/styles/main.css'
import router from './router'
createApp(Home).use(router).mount('#app')
