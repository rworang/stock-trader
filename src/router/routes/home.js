import Stocks from "@/views/Stocks.vue";

import DefaultLayout from "@/layouts/Default";

export default [
  {
    path: "/",
    name: "stocks",
    component: Stocks,
    meta: {
      auth: true,
      title: "Stocks",
      layout: DefaultLayout,
      transition: "fade-in-left"
    }
  },
  {
    path: "/portfolio",
    name: "portfolio",
    component: () =>
      import(/* webpackChunkName: "portfolio" */ "@/views/Portfolio"),
    meta: {
      auth: true,
      title: "Portfolio",
      layout: DefaultLayout,
      transition: "fade-in-right"
    }
  }
];
