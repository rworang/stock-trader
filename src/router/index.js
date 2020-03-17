import Vue from "vue";
import VueRouter from "vue-router";
import VueMeta from "vue-meta";
import Stocks from "@/views/Stocks.vue";

import DefaultLayout from "@/layouts/Default.vue";

Vue.use(VueRouter);
Vue.use(VueMeta);

const routes = [
  {
    path: "/",
    name: "stocks",
    component: Stocks,
    meta: {
      layout: DefaultLayout
    }
  },
  {
    path: "/portfolio",
    name: "portfolio",
    component: () =>
      import(/* webpackChunkName: "portfolio" */ "@/views/Portfolio.vue"),
    meta: {
      layout: DefaultLayout
    }
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "@/views/Register.vue"),
    meta: {
      layout: () =>
        import(/* webpackChunkName: "basic layout" */ "@/layouts/Basic.vue")
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
