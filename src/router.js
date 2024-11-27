import { createWebHistory, createRouter } from 'vue-router'

import CarsList from './components/CarsList.vue'
import GeneralVue from './components/Diagnostics/GeneralVue.vue'
import DiagnosticsVue from './components/DiagnosticsVue.vue'

const routes = [
  { path: '/', component: CarsList },
  { path: '/diagnostics/', component: DiagnosticsVue, props: true },
  { path: '/diagnostics/subsection', component: GeneralVue, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
