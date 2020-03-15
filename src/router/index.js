import Vue from "vue";
import VueRouter from "vue-router";
import Stocks from "../views/Stocks.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "stocks",
    component: Stocks
  },
  {
    path: "/portfolio",
    name: "portfolio",
    component: () =>
      import(/* webpackChunkName: "portfolio" */ "../views/Portfolio.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
