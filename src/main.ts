import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-persistedstate-plugin';
import router from './router';

// 引入框架页
import App from './App.vue';

// 初始化
const app = createApp(App);

// 加载pinia
const pinia = createPinia();

// pinia持久化处理
pinia.use(createPersistedState({storage: window.localStorage}));

// 把版本号挂在全局 
app.config.globalProperties.$VERSION = "1.0.3";

// 挂载
app.use(pinia).use(router).mount('#app');
