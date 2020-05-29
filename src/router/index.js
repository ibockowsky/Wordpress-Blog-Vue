import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import ShowPost from '@/views/ShowPost.vue'
import store from '@/store/index.js'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true
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
  routes
})

export default router
