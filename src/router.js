import { createWebHistory, createRouter } from 'vue-router';
import CarsList from './components/CarsList.vue';
import DiagnosticsVue from './components/DiagnosticsVue.vue';
import GeneralVue from './components/GeneralVue.vue';

const routes = [
	{ path: '/', component: CarsList },
	{ path: '/diagnostics/', component: DiagnosticsVue, props: true },
	{ path: '/diagnostics/subsection', component: GeneralVue, props: true },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
