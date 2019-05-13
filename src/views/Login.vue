<template>
  <div class="login">
    <h1>Articles</h1>
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="demo-form"
    >
      <el-form-item label="用户名" prop="id">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="密 码" prop="pass">
        <el-input
          type="password"
          v-model="form.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登陆</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import store from "store";

import router from "../router";

export default {
  data() {
    return {
      form: {
        id: "",
        pass: ""
      },
      rules: {
        id: [
          { required: true, message: "请输入用户名", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入登陆密码", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { id, pass } = this.form;
          axios
            .post("/user/login", { id, pass })
            .then(data => {
              const userId = data.id;
              store.set("userId", userId);
              axios.defaults.headers.userid = userId;
              this.$message({
                message: "登陆成功",
                type: "success"
              });
              router.push("/");
            })
            .catch(err => {
              console.error(err);
            });
        } else {
          console.log("error submit!!");
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
.login {
  width: 500px;
  margin: 0 auto;
  padding-top: 20px;
  text-align: center;
}
</style>
