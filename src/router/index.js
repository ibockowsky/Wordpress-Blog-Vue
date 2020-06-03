import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import ShowPost from '@/views/ShowPost.vue'
import store from '@/store/index.js'
import NProgress from 'nprogress'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true,
    meta: { scrollToTop: true }
  },
  {
    path: '/post/:slug',
    name: 'ShowPost',
    component: ShowPost,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('getPost', routeTo.params.slug)
        .then(post => {
          store.dispatch('getComments', post.ID).catch(err => console.log(err))
          routeTo.params.post = post
          next()
        })
        .catch(err => console.log(err))
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
