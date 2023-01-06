import { createApp, toRaw } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App);
window.___$vue_app = app;
console.log(app, "查看并学习vue_app上的属性和方法");

// TODO: MVVM框架中的VM
const vm = app.mount('#app');
window.___$vm_rootElement = toRaw(vm);
console.log({ vmAndRootElement: window.___$vm_rootElement });
