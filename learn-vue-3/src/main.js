import { createApp, toRaw } from 'vue'
// import { createApp, toRaw } from 'vue/dist/vue.runtime.esm-bundler';
// import { createApp, toRaw } from 'vue/dist/vue.esm-bundler';
import './style.css'
import _App from './App.vue'
import RootCom_Lifecycle from "./根组件的生命周期.vue";
import HelloWorld from "./components/HelloWorld.vue";
import dynamicCom from "./动态组件/index.vue";
import asyncCom from "./异步组件/index.vue";
import customDirective from "./自定义指令/index.vue";

import { install as pluginLearn } from "./插件/learn";

const App = _App;
// const App = RootCom_Lifecycle;

const app = createApp(App);
app.use(pluginLearn);

app.component('HelloWorld', HelloWorld);
app.component('dynamicCom', dynamicCom);
app.component('asyncCom', asyncCom);
app.component('customDirective', customDirective);

app.config.globalProperties.unmount = app.unmount;
app.config.globalProperties.__unmount = app.unmount;
app.provide('unmount', app.unmount);

window.___$vue_app = app;
console.log(app, "查看并学习vue_app上的属性和方法");

// TODO: MVVM框架中的VM
const vm = app.mount('#app');
window.___$vm_rootElement = toRaw(vm);
console.log({ vmAndRootElement: window.___$vm_rootElement });
