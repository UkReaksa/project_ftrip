import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// import Dashbord from "../components/home/main_home.vue";
import Dashbord_about from "../components/about/Dashbord_about.vue";
import infomation from "../components/home/All_infomation.vue";
import events from "../components/events/Events_dashbord.vue";
import partner from "../components/partner/Partner_dashbord.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/dashbord_about",
      name: "dashbord_about",
      component: Dashbord_about,
      // meta: { requiresAuth: true }, // protect this route
    },
    {
      path: "/all_infomation",
      name: "all_infomation",
      component: infomation,
    },
    {
      path: "/events",
      name: "events",
      component: events,
    },
    {
      path: "/partner",
      name: "partner",
      component: partner,
    }
  ],
});

export default router;
