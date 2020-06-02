<template>
  <div>
    <b-jumbotron>
      <b-img
        v-bind="mainProps"
        :src="post.featured_image"
        rounded
        fluid
      ></b-img>
      <template v-slot:header>{{ post.title }}</template>

      <hr class="my-4" />

      <p class="text-left">
        <span v-html="post.content"></span>
      </p>
      <b-button @click="goBack">Go Back!</b-button>
    </b-jumbotron>
    <Comment v-for="comment in comments" :key="comment.ID" :comment="comment" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Comment from '@/components/Comment.vue'
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
  data() {
    return {
      mainProps: { width: 1024, height: 400, class: 'm1' }
    }
  },
  methods: {
    goBack() {
      return this.$router.go(-1)
    }
  },
  computed: {
    ...mapState(['comments'])
  }
}
</script>

<style></style>
