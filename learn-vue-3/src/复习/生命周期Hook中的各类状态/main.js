import { createApp, toRaw } from 'vue'
import './style.css'
import App from './生命周期.vue'

const app = createApp(App);

// TODO: MVVM框架中的VM
const vm = app.mount('#app');
