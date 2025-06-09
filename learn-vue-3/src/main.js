import { createApp, toRaw } from 'vue'
import './style.css'
// import App from './响应原理/readonly/refObj.vue'
// import App from './响应原理/readonly/ref.vue'
// import App from './响应原理/ref/index.vue'
// import App from './响应原理/watch/refObj.vue'
// import App from './响应原理/watch/ref.vue'

import App from './App.vue'

const app = createApp(App);

// TODO: MVVM框架中的VM
const vm = app.mount('#app');
