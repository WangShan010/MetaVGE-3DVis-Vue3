import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import Vue3DraggableResizable from 'vue3-draggable-resizable';
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css';
import 'animate.css';
import App from './App.vue';
import store from './store/index.js';
import router from './router/index.js';
import drag from './assets/global/directives/drag.js';

let app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(Vue3DraggableResizable);
app.directive('drag', drag);
app.mount('#app');
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
