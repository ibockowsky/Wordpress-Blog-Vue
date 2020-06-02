<template>
  <div>
    <PostCard
      v-for="post in this.posts"
      :key="post.id"
      :post="post"
      class="post"
    />
    <div class="overflow-auto">
      <b-pagination-nav
        :link-gen="linkGen"
        :number-of-pages="maxPages()"
        use-router
        align="center"
      >
      </b-pagination-nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/store/index.js'
import PostCard from '@/components/PostCard.vue'
import { scrollToTop } from '@/mixins/Helpers.js'
import gsap from 'gsap'

async function getPages(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1
  await store.dispatch('getPosts', { page: currentPage }).then(() => {
    routeTo.params.page = currentPage
    next()
  })
  scrollToTop()
}

export default {
  name: 'Home',
  components: {
    PostCard
  },
  props: {
    page: {
      type: Number,
      required: true
    }
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
  },
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
    maxPages() {
      const allPages = this.totalPosts / this.limit
      if (allPages > parseInt(allPages)) {
        return parseInt(this.totalPosts / this.limit) + 1
      }
      return parseInt(this.totalPosts / this.limit)
    }
  }
}
</script>

<style scoped>
* {
  text-align: center;
}
</style>
