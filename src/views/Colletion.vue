<template>
  <el-row>
    <el-col
      :span="11"
      v-for="(collection, index) in collections"
      :key="collection._id"
      :offset="index % 2 === 0 ? 0 : 1"
    >
      <el-card
        :body-style="{ padding: '0px', cursor: 'pointer' }"
        shadow="hover"
      >
        <div class="article-item-top" @click="onView(article)">
          <img :src="collection._articleid.imageUrl" class="image" />
          <p>{{ collection._articleid.content.slice(0, 600) }}</p>
        </div>
        <div class="article-item-bottom">
          <div style="padding: 14px;" @click="onView(article)">
            <span>{{ collection._articleid.title }}</span>
            <div class="bottom clearfix">
              <time class="time">{{
                new Date(collection._articleid._createtime).toLocaleString()
              }}</time>
            </div>
          </div>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="onUnCollect(collection)"
          ></el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
  name: 'collection',
  data() {
    return {
      collections: []
    };
  },
  created() {
    axios.get('/collection').then(data => {
      this.collections = data;
    });
  },
  methods: {
    onUnCollect(collection) {
      const { _id } = collection;
      axios
        .delete(`/collection/${_id}`)
        .then(() => {
          this.$message({
            message: '取消收藏成功',
            type: 'success'
          });
          axios.get('/collection').then(data => {
            this.collections = data;
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    onView(collection) {
      const { _id } = collection._articleid;
      router.push(`/article/${_id}`);
    }
  }
};
</script>
