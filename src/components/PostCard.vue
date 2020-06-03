<template>
  <div class="mx-auto">
    <b-card class="mb-2 mx-auto" style="max-width: 40rem;">
      <b-card-img
        :src="getPostImg(post.featured_image)"
        class="card-img img-fluid "
      ></b-card-img>
      <h4 v-html="post.title"></h4>
      <b-card-text>
        <span
          class="post-text"
          v-html="tooLongContent(post.content) + '...'"
        ></span>
      </b-card-text>
      <b-button
        :to="{ name: 'ShowPost', params: { slug: post.slug } }"
        variant="primary"
        >Read more...</b-button
      >
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    getPostImg(url) {
      return url.length > 0 ? url : ''
    },
    tooLongContent(content) {
      let maxLength = 150

      return content && content.length > maxLength
        ? content
            .slice(0, maxLength)
            .split(' ')
            .slice(0, -1)
            .join(' ')
        : content
    }
  }
}
</script>

<style>
.card-img {
  max-width: 40rem;
  max-height: 25rem;
}
.alignnone {
  display: none;
}
</style>
