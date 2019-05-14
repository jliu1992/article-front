<template>
  <div class="detail">
    <h1>{{ article.title }}</h1>
    <time>{{ new Date(article._createtime).toLocaleString() }}</time>
    <vue-markdown :source="article.content"></vue-markdown>
  </div>
</template>

<script>
import axios from 'axios';
import VueMarkdown from 'vue-markdown';

export default {
  name: 'detail',
  components: {
    VueMarkdown
  },
  data() {
    return {
      article: {}
    };
  },
  created() {
    const id = this.$route.params.id;
    axios.get(`/article/${id}`).then(data => {
      this.article = data;
    });
  }
};
</script>
