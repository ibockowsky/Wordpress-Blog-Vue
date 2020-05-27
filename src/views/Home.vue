<template>
  <div>
    <PostCard v-for="post in this.posts" :key="post.id" :post="post" />
    <router-link v-if="page != 1" :to="{ name: 'Home', query: { page: page - 1 } }" rel="prev"> Prev Page</router-link>
    <router-link v-if="isNextPage" :to="{ name: 'Home', query: { page: page + 1 } }" rel="next"> Next Page</router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/store/index.js'
import PostCard from '@/components/PostCard.vue'

function getPages(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1
  store.dispatch('getPosts', { page: currentPage }).then(() => {
    routeTo.params.page = currentPage
    next()
  })
}

export default {
  name: 'Home',
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    PostCard
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPages(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPages(routeTo, next)
  },
  computed: {
    isNextPage() {
      return this.totalPosts > this.page * this.limit
    },
    ...mapState(['posts', 'totalPosts', 'limit'])
  }
}
</script>

<style>
* {
  text-align: center;
}
</style>
