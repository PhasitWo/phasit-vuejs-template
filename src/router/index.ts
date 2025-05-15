import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Library from '@/views/LibraryView.vue'
import NotFound from '@/components/NotFound.vue'
import Watchlist from '@/views/WatchlistView.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Home',
        layout: 'Baseline',
      },
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: 'About',
        layout: 'Baseline',
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/library',
      name: 'library',
      component: Library,
      meta: { title: 'Library', layout: 'Baseline' },
    },
    {
      path: '/watchlist',
      name: 'watchlist',
      component: Watchlist,
      meta: { title: 'Watchlist', layout: 'Baseline' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

export default router
