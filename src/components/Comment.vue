<template>
  <div>
    <b-card class>
      <b-media>
        <template v-slot:aside>
          <b-img :src="comment.author.avatar_URL" width="64"></b-img>
        </template>

        <h5 class="mt-0">{{ comment.author.name }}</h5>
        <p>
          <span v-html="comment.content"></span>
        </p>
      </b-media>
    </b-card>
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
