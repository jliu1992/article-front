<template>
  <div class="setting">
    <h2>Setting</h2>
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="demo-form"
    >
      <el-form-item label=" 用 户 名" prop="id">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="原 密 码" prop="oldpass">
        <el-input
          type="password"
          v-model="form.oldpass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="新 密 码" prop="pass">
        <el-input
          type="password"
          v-model="form.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="repeatpass">
        <el-input
          type="password"
          v-model="form.repeatpass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">修改</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import store from 'store';

import router from '../router';

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.repeatpass !== '') {
          this.$refs.form.validateField('repeatpass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: {
        id: '',
        oldpass: '',
        pass: '',
        repeatpass: ''
      },
      rules: {
        id: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        oldpass: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        repeatpass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { id, pass } = this.form;
          axios
            .post('/user/signup', { id, pass })
            .then(data => {
              const userId = data.id;
              store.set('userId', userId);
              axios.defaults.headers.userid = userId;
              this.$message({
                message: '注册成功',
                type: 'success'
              });
              router.push('/');
            })
            .catch(err => {
              console.error(err);
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.setting {
  width: 500px;
  margin-left: 20px;
  padding-top: 20px;
  text-align: center;
}
</style>
