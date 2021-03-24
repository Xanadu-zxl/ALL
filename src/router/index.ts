import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import pdgt from './pdgt'

const routes: Array<RouteRecordRaw> = [
  ...pdgt
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
