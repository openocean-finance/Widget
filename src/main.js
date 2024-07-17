import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueMeta from "vue-meta";
import axios from "./utils/http";
import "@/styles/font.scss";
import "@/styles/theme.scss";
import "@/styles/global.scss";
import "@/assets/iconfont/iconfont.css";

import { client } from "@ont-dev/ontology-dapi";
import base from "./mixin";
import "@/utils/resize";
import { initTheme } from "@/utils/theme";
import i18n from "@/utils/lang";

Vue.prototype.$axios = axios;

Vue.prototype.$eventGlobal = new Vue();

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true,
});

Vue.config.productionTip = false;

client.registerClient({});

Vue.mixin(base);

initTheme();

const instance = new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
window.$t = instance.$t.bind(instance);




