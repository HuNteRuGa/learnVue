import db from '../../db/index';

export default {
  actions: {
    async getPosts(ctx) {
      ctx.commit('onPostRequest');

      db.collection('posts')
        .doc('posts')
        .onSnapshot(doc => {
          ctx.commit('updatePosts', doc.data().posts);
        });
    },
    async addPost(ctx, post) {
      const posts = [...ctx.state.posts, post];

      db.collection('posts')
        .doc('posts')
        .set({ posts });
    },
  },
  mutations: {
    onPostRequest(state) {
      state.postRequest = true;
    },
    updatePosts(state, res) {
      const posts = [];
      for (const key in res) {
        posts.push({
          id: key,
          ...res[key],
        });
      }
      state.posts = posts.sort((a, b) => b.id - a.id);
    },
  },
  state: () => ({
    posts: [],
    postRequest: false,
  }),
  getters: {
    postRequest: state => state.postRequest,
    allPosts: state => state.posts.map(value => ({ ...value, title: value.title.toUpperCase() })),
    getPost: state => postId => state.posts.filter(value => value.id === postId)[0],
  },
};
