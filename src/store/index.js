import Vue from 'vue'
import Vuex from 'vuex'
import WordpressService from '@/services/WordpressService.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    totalPosts: 0,
    post: {},
    comments: [],
    limit: 5
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts
    },
    SET_TOTAL_POSTS(state, totalPosts) {
      state.totalPosts = totalPosts
    },
    SET_POST(state, post) {
      state.post = post
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments
    }
  },
  actions: {
    getPosts({ state, commit }, { page }) {
      return WordpressService.getPosts(state.limit, page)
        .then(response => {
          // console.log(response)
          commit('SET_TOTAL_POSTS', response.data.found)
          commit('SET_POSTS', response.data.posts)
        })
        .catch(err => console.log(err))
    },
    getPost({ state, commit }, slug) {
      if (slug === state.post.slug) {
        return state.post
      }

      const post = this.getters.findPostBySlug(slug)

      if (post) {
        commit('SET_POST', post)
        console.log(post)
        return post
      } else {
        return WordpressService.getPost(slug)
          .then(response => {
            console.log(response)
            commit('SET_POST', response.data.posts[0])
            return response.data.posts[0]
          })
          .catch(err => console.log(err))
      }
    },
    getComments({ commit }, post_id) {
      return WordpressService.getComments(post_id).then(response => {
        commit('SET_COMMENTS', response.data.comments)
        return response.data
      })
    }
  },
  getters: {
    findPostBySlug: state => slug => {
      return state.posts.find(post => post.slug === slug)
    }
  }
})
