<template>
  <el-container style="height:100%">
    <el-header class="el-header-custom">
      <h1 style="color: #fff;">Articles</h1>
      <div>
        <h5>{{ userId }}</h5>
        <span @click="onLogout">logout</span>
      </div>
    </el-header>
    <el-container class="el-container-custom">
      <el-aside width="200px" class="menu-aside">
        <el-button class="btn-new" type="primary" @click="onNewArticle">
          New Article
          <i class="el-icon-edit el-icon--right"></i>
        </el-button>
        <el-menu
          router
          :default-active="path"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            Home
          </el-menu-item>
          <el-menu-item index="/mine">
            <i class="el-icon-user-solid"></i>
            Mine
          </el-menu-item>
          <el-menu-item index="/colletion">
            <i class="el-icon-star-on"></i>
            Colletions
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            Setting
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="height: 100%;">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from 'store';
import axios from 'axios';

import router from '../router';

export default {
  data() {
    return { path: '/', userId: '' };
  },
  created: function() {
    const { pathname } = window.location;
    const userId = store.get('userId');
    this.userId = userId;
    this.path = pathname;
  },
  methods: {
    onNewArticle() {
      router.push('/new');
    },
    onLogout() {
      axios
        .post('/user/logout', {})
        .then(() => {
          store.set('userId', '');
          axios.defaults.headers.userid = '';
          router.push('/login');
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style lang="scss">
html {
  width: 100%;
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
div#root {
  width: 100%;
  height: 100%;
  background-color: red;
}
.el-header-custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #444c54;
  & > div {
    display: flex;
    align-items: center;
    h5 {
      color: #fff;
    }
    span {
      cursor: pointer;
      font-size: 14px;
      margin-left: 5px;
      color: #66b1ff;
    }
  }
}
.el-container-custom {
  flex: 1;
  .menu-aside {
    background-color: #545c64;
    button.btn-new {
      margin: 5px 32px;
    }
    & a {
      color: unset;
      text-decoration: none;
    }
  }
}
</style>
