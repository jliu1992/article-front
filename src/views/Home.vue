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
          <el-button
            type="primary"
            icon="el-icon-star-off"
            circle
            @click="onCollect(article)"
          ></el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss">
.article-item-top {
  display: flex;
  height: 236px;
  & > img {
    width: 236px;
  }
  p {
    flex: 1;
    margin: 0;
    padding: 10px;
    line-height: 25px;
    overflow: hidden;
  }
}
.article-item-bottom {
  display: flex;
  padding-right: 10px;
  justify-content: space-between;
  align-items: center;
}
.time {
  font-size: 13px;
  color: #999;
}
</style>

<script>
import axios from 'axios';
import router from '../router';

export default {
  name: 'home',
  data() {
    return {
      articles: []
    };
  },
  created() {
    axios.get('/article').then(data => {
      this.articles = data;
    });
  },
  methods: {
    onCollect(article) {
      const { _id } = article;
      const params = { _articleid: _id };
      axios
        .post('/collection', params)
        .then(() => {
          this.$message({
            message: '收藏成功',
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
