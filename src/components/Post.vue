<template>
  <div class="container">
    <router-link to="/" class="link">Назад</router-link>
    <section class="d-flex flex-column post">
      <h1 class="post__title">{{ post.title }}</h1>
      <p class="post__body">{{ post.body }}</p>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    };
  },
  computed: mapGetters(['allPosts', 'getPost', 'postRequest']),
  methods: mapActions(['getPosts']),
  async mounted() {
    const postId = +this.$route.params.id;
    if (!this.postRequest) await this.getPosts();
    this.post = this.getPost(postId);
  },
};
</script>

<style lang="scss" scoped>
@import './styles/mixins.scss';
@import './styles/vars.scss';

.link {
  @include m20;
  @include block;
  text-align: center;
  width: 100%;
  font-size: 24px;
}
</style>
