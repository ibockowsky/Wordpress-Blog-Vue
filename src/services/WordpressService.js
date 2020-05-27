import axios from 'axios'

const wordpressApiClient = axios.create({
  baseURL: `https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

export default {
  getPosts(postsLimit, page) {
    return wordpressApiClient.get(`/posts?number=${postsLimit}&page=${page}`)
  },
  getPost(slug) {
    return wordpressApiClient.get(`/posts?slug=${slug}`)
  },
  getComments(post_id) {
    return wordpressApiClient.get(`/posts/${post_id}/replies`)
  }
}
