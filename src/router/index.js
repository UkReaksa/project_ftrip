import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Dashbord from "@/components/dashbord/Dashbord.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    // {
    //   path: "/login",
    //   name: "login",
    //   component: () => import("../components/Login.vue"),
    //   meta: { requiresAuth: false, requiresRole: "admin" },
    // },
    {
      path: "/user_dashbord",
      name: "user_dashbord  ",
      component: () => import("../components/dashbord/User_dashbord.vue"),
      meta: { requiresAuth: false, requiresRole: "user" },
    },
    {
      path: "/dashbord",
      name: "dashbord",
      component: Dashbord,
      meta: { requiresAuth: true }, // protect this route
    },
  ],
});

export default router;
