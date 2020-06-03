<template>
  <div>
    <b-img :src="post.featured_image" class="img-post w-100" rounded></b-img>
    <div class="col-sm-4 mx-auto">
      <blockquote class="blockquote">
        <h1 class="display-4 text-left">{{ post.title }}</h1>
        <footer
          class="blockquote-footer"
          v-html="removeHTML(post.excerpt)"
        ></footer>
      </blockquote>
      <div class="post-author">
        <b-avatar variant="info" :src="post.author.avatar_URL"></b-avatar>
        {{ post.author.name }}
      </div>
      <hr class="my-4" />
    </div>
    <div class="col-sm-5 mx-auto">
      <span v-html="post.content"></span>
    </div>
    <div class="d-flex flex-row-reverse p-3">
      <b-button @click="goBack">Go Back!</b-button>
    </div>
    <div class="w-100 clear-fix ">
      <h1 class="display-5 text-center mt-5 mb-3">Comments:</h1>
      <Comment
        v-for="comment in comments"
        :key="comment.ID"
        :comment="comment"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Comment from '@/components/Comment.vue'
import { scrollToTop } from '@/mixins/Helpers.js'
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  components: {
    Comment
  },
  mounted() {
    scrollToTop()
  },
  methods: {
    goBack() {
      return this.$router.go(-1)
    },
    removeHTML(string) {
      return string.replace(/<\/?[^>]+>/gi, ' ')
    }
  },
  computed: {
    ...mapState(['comments'])
  }
}
</script>

<style>
.img-post {
  height: 50rem;
  object-fit: cover;
}
.post-author {
  color: #5f5f5f;
}
</style>
