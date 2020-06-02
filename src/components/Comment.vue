<template>
  <div class="col-sm-3 mx-auto">
    <b-media>
      <template v-slot:aside>
        <b-avatar variant="info" :src="comment.author.avatar_URL"></b-avatar>
      </template>

      <h5 class="mt-0">{{ comment.author.name }}</h5>
      <p>
        <span v-html="comment.content"></span>
      </p>
    </b-media>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>

<style></style>
