import Vue from "vue";
import ElementUI from "element-ui";
import viserVue from "viser-vue";

import "normalize.css/normalize.css";
import "./assets/element-variables.scss";
import "./icons.js";
import "./filter.js";

import App from "./App";
import router from "./router";
import store from "./store";
import utils from "./utils/index";

Vue.use(ElementUI, {
  size: "medium"
});

Vue.use(viserVue);

Vue.config.productionTip = false;

new Vue({
  // 将工具函数注入vue根实例
  data: {...utils},
  router,
  store,
  render: h => h(App)
}).$mount("#app");