import Vue from 'vue';
import Router from 'vue-router';
import App from './views/App.vue';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'app',
      component: App,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/mine',
          name: 'mine',
          component: () =>
            import(/* webpackChunkName: "mine" */ './views/MyArticle.vue')
        },
        {
          path: '/colletion',
          name: 'colletion',
          component: () =>
            import(/* webpackChunkName: "colletion" */ './views/Colletion.vue')
        },
        {
          path: '/setting',
          name: 'setting',
          component: () =>
            import(/* webpackChunkName: "setting" */ './views/Setting.vue')
        },
        {
          path: '/new',
          name: 'new',
          component: () =>
            import(/* webpackChunkName: "new" */ './views/NewArticle.vue')
        },
        {
          path: '/edit/:id',
          name: 'edit',
          component: () =>
            import(/* webpackChunkName: "edit" */ './views/Edit.vue')
        },
        {
          path: '/article/:id',
          name: 'article',
          component: () =>
            import(/* webpackChunkName: "article" */ './views/Detail.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () =>
        import(/* webpackChunkName: "signup" */ './views/Signup.vue')
    }
  ]
});
