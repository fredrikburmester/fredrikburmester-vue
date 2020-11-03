import { createRouter, createWebHistory } from "vue-router";
import Album from "@/views/Album.vue";

const routes = [
  {
    path: "/",
    redirect: "/Home",
    name: "Home",
    props: true,
    component: Album
  },
  {
    path: "/:album",
    name: "Album",
    props: true,
    component: Album
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;
