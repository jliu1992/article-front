<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="文章标题">
      <el-input autofocus v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="文章类型">
      <el-select v-model="form.type" placeholder="请选择文章类型">
        <el-option label="笔记" value="笔记"></el-option>
        <el-option label="随笔" value="随笔"></el-option>
        <el-option label="专题" value="专题"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="上传图片">
      <el-upload
        class="avatar-uploader"
        action="/api/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="是否私密">
      <el-switch v-model="form.secret"></el-switch>
    </el-form-item>
    <el-form-item label="文章内容">
      <!-- <el-input
        type="textarea"
        rows="20"
        maxlength="5000"
        show-word-limit
        clearable
        v-model="form.content"
      ></el-input> -->
      <mavon-editor v-model="form.content" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">发布</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
  name: 'new',
  data() {
    return {
      form: {
        title: '',
        type: '',
        secret: false,
        content: '',
        imageUrl: ''
      }
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      const { filePath } = res;
      this.form.imageUrl = `http://localhost:3000/${filePath}`;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    onSubmit() {
      const { title, type, imageUrl, secret, content } = this.form;
      const params = { title, type, imageUrl, secret, content };
      axios
        .post('/article', params)
        .then(() => {
          this.$message({
            message: '发布成功',
            type: 'success'
          });
          router.push('/');
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
