import Vue from "vue";
import VueRouter from "vue-router";

const Classic = () => import("../pages/ClassicV3/index.vue");

import { initTryConnect } from "../init";
Vue.use(VueRouter);

let routes = [
  {
    path: "/",
    name: "Classic",
    component: Classic,
    meta: {
      isConnect: true
    }
  },
  {
    path: "/theme",
    name: "Theme",
    component: () => import("../pages/Theme/index.vue"),
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  window.addEventListener("load", () => {
    // initTryConnect();
  });
  return next();
});

export default router;
