<template>
  <div>
    <header>
      <h1 class="header">{{ header }}</h1>
    </header>
    <div class="container">
      <form @submit="onAddPost">
        <div class="row">
          <section class="col-12 add-post d-flex flex-column align-items-center">
            <input type="text" class="add-post__title" placeholder="Название" v-model="postTitle" />
            <textarea class="add-post__body" placeholder="Текст публикации..." v-model="postBody" />
            <button class="add-post__button">Добавить</button>
          </section>
        </div>
      </form>
      <article class="row flex-column align-items-center">
        <section v-for="post in allPosts" class="post" :key="post.id">
          <h2 class="post__title">{{ post.title }}</h2>
          <p class="post__body">{{ post.body }}</p>
          <button class="post__button" @click="() => openPost(post)">Подробнее</button>
          <hr />
        </section>
      </article>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Homepage',
  data() {
    return {
      header: 'Posts',
      postTitle: '',
      postBody: '',
    };
  },
  computed: {
    allPosts() {
      return this.$store.getters.allPosts;
    },
    ...mapGetters(['postRequest']),
  },
  async mounted() {
    if (!this.postRequest) this.getPosts();
  },
  methods: {
    ...mapActions(['getPosts', 'addPost']),
    openPost(post) {
      this.$router.push({ path: `/post/${post.id}` });
    },
    onAddPost(e) {
      e.preventDefault();
      if (this.postTitle.trim() !== '' && this.postBody.trim() !== '') {
        const id = Date.now();
        this.addPost({ id, title: this.postTitle, body: this.postBody });
        this.postTitle = '';
        this.postBody = '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import './styles/mixins.scss';
@import './styles/vars.scss';

.header {
  @include m50;
  @include posr;
  color: $textColor;
  font-size: 70px;
  text-align: center;
  font-family: $headerFont;

  &::after {
    @include elem;
    @include posa;
    width: 180px;
    height: 7px;
    left: calc(50% - 90px);
    bottom: -20px;
    background: $textColor;
  }
}

.post {
  margin: 0 0 30px 0;
  padding: 50px 0 0 0;
  border-top: 1px solid $textColor;
  width: 100%;
  flex-shrink: 0;

  &__title {
    margin: 0 0 20px 0;
    font-size: 32px;
    width: 80%;
    font-family: $lightHeaderFont;
  }
  &__body {
    font-size: 18px;
  }
  &__button {
    margin: 10px 0 0 0;
    font-size: 20px;
    color: $primaryTextColor;
    width: 200px;
    height: 40px;
    background: $primaryColor;
    border: none;
    border-radius: 12px;
    cursor: pointer;
  }
}

.add-post {
  padding: 0 0 15px 0;

  &__title,
  &__body {
    @include m10;
    width: 400px;
    height: 40px;
    border: none;
    background: transparent;
    font-size: 20px;
    color: $textColor;
    border-bottom: 2px solid $textColor;

    &::placeholder,
    &::-webkit-input-placeholder,
    &::-moz-placeholder {
      color: $textColor;
    }
  }

  &__body {
    height: 120px;
    font-size: 18px;
    resize: none;
  }
  &__button {
    @include m10;
    font-size: 20px;
    color: $primaryTextColor;
    width: 200px;
    height: 40px;
    background: $primaryColor;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    padding: 0;
    box-sizing: border-box;
  }
}
</style>
