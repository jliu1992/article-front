import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";

require("./util/http");

Vue.use(ElementUI);
Vue.use(mavonEditor);

Vue.config.productionTip = false;

window.app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
