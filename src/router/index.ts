import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue";
import ButtonA from "@/views/ButtonA.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/button-a", name: "buttonA", component: ButtonA },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
