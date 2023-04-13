import { createApp, toRaw } from 'vue'
import './style.css'
import App from "./根组件的生命周期.vue";

const app = createApp(App);

app.config.globalProperties.unmount = app.unmount;
app.config.globalProperties.__unmount = app.unmount;
app.provide('unmount', app.unmount);

// TODO: MVVM框架中的VM
const vm = app.mount('#app');
