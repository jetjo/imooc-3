import { createApp, toRaw } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App);

// TODO: MVVM框架中的VM
const vm = app.mount('#app');
