import Vue from "vue";
import VueRouter from "vue-router";
import VueMeta from "vue-meta";
import routes from "./routes";
import store from "@/store";

Vue.use(VueRouter);
Vue.use(VueMeta);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.afterEach(() => {
  store.commit("SET_ERRORS", null);
});

export default router;
