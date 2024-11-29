import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import 'ant-design-vue/dist/reset.css';
import router from './router.js';

createApp(App)
	.use(router)
	.mount('#app');
