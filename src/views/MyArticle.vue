<template>
  <el-row>
    <el-col
      :span="11"
      v-for="(article, index) in articles"
      :key="article._id"
      :offset="index % 2 === 0 ? 0 : 1"
    >
      <el-card
        :body-style="{ padding: '0px', cursor: 'pointer' }"
        shadow="hover"
      >
        <div class="article-item-top" @click="onView(article)">
          <img :src="article.imageUrl" class="image" />
          <p>{{ article.content.slice(0, 600) }}</p>
        </div>
        <div class="article-item-bottom">
          <div style="padding: 14px;" @click="onView(article)">
            <span>{{ article.title }}</span>
            <div class="bottom clearfix">
              <time class="time">
                {{ new Date(article._createtime).toLocaleString() }}
              </time>
            </div>
          </div>
          <div>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="onEdit(article)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="onDelete(article)"
            ></el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
  name: 'mine',
  data() {
    return {
      articles: []
    };
  },
  created() {
    axios.get('/article/myarticles').then(data => {
      this.articles = data;
    });
  },
  methods: {
    onEdit(article) {
      const { _id } = article;
      router.push(`/edit/${_id}`);
    },
    onDelete(article) {
      const { _id } = article;
      axios
        .delete(`/article/${_id}`)
        .then(() => {
          axios.get('/article/myarticles').then(data => {
            this.articles = data;
          });
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    onView(article) {
      const { _id } = article;
      router.push(`/article/${_id}`);
    }
  }
};
</script>
