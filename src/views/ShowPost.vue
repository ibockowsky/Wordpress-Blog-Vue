<template>
  <div>
    <b-jumbotron>
      <b-img v-bind="mainProps" :src="post.featured_image" rounded fluid></b-img>
      <template v-slot:header>{{ post.title }}</template>

      <hr class="my-4" />

      <p>
        <span v-html="post.content"></span>
      </p>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    },
    comments: {
      type: Object
    }
  },
  data() {
    return {
      mainProps: { width: 1024, height: 400, class: 'm1' }
    }
  }
}
</script>

<style></style>
