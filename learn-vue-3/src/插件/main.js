import { createApp } from "vue";

import App from './wrapper.vue'

const app = createApp(App)

import { install as pluginLearn } from "./learn";

// pluginLearn(app);
app.use(pluginLearn);

const vm = app.mount('#app')

