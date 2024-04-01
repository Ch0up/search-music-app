import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: () => import('../views/FavoriteView.vue')
    },
    {
      path: '/album/:albumId',
      name: 'album',
      component: () => import('../views/AlbumView.vue')
    },
    {
      path: '/artist/:artistName',
      name: 'artist',
      component: () => import('../views/ArtistView.vue')
    }
  ]
})

export default router
