import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Add from "../views/Add.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/add",
    name: "Add",
    component: Add,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
