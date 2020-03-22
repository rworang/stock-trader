import Overview from "@/views/Overview.vue";
import DefaultLayout from "@/layouts/Default";
export default [
  {
    path: "/",
    name: "overview",
    component: Overview,
    meta: {
      auth: true,
      title: "Overview",
      layout: DefaultLayout,
      transition: "fade"
    }
  },
  {
    path: "/stocks",
    name: "stocks",
    component: () =>
      import(/* webpackChunkName: "stocks" */ "@/views/Stocks"),
    meta: {
      auth: true,
      title: "Stocks",
      layout: DefaultLayout,
      transition: "fade"
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
      transition: "fade"
    }
  }
];
