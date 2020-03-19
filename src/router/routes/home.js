import Stocks from "@/views/Stocks.vue";

import DefaultLayout from "@/layouts/Default";

export default [
  {
    path: "/",
    name: "stocks",
    component: Stocks,
    meta: {
      title: "Stocks",
      layout: DefaultLayout
    }
  },
  {
    path: "/portfolio",
    name: "portfolio",
    component: () =>
      import(/* webpackChunkName: "portfolio" */ "@/views/Portfolio"),
    meta: {
      title: "Portfolio",
      layout: DefaultLayout
    }
  },
  {
    path: "*",
    redirect: "/"
  }
];
