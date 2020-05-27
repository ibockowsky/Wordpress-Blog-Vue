<template>
  <div class="mx-auto">
    <b-card :title="post.title" :img-src="post.featured_image" class="mb-2 mx-auto" style="max-width: 40rem;">
      <b-card-text>
        <span v-html="tooLongContent(post.content) + '...'"></span>
      </b-card-text>
      <b-button :to="{ name: 'ShowPost', params: { slug: post.slug } }" variant="primary">Read more...</b-button>
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
    tooLongContent(content) {
      let maxLength = 400

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

<style></style>
