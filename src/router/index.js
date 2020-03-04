import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Stocks.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Stocks",
    component: Home
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Portfolio.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
