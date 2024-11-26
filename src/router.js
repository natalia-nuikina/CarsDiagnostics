import { createWebHistory, createRouter } from 'vue-router'

import CarsList from './components/CarsList.vue'
import GeneralVue from './components/Diagnostics/GeneralVue.vue'
import DiagnosticsVue from './components/DiagnosticsVue.vue'

const routes = [
  { path: '/cars/', component: CarsList },
  { path: '/cars/diagnostics/', component: DiagnosticsVue, props: true },
  { path: '/cars/diagnostics/subsection', component: GeneralVue, props: true },
]

// const routes = [
//   { path: '/cars/', component: CarsList,
//     children: [
//       { path: '/cars/diagnostics/', component: DiagnosticsVue, children: [
//         { path: '/cars/diagnostics/subsection', component: GeneralVue, props: true },
//       ], props: true },
//     ],
//   },
// ]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
