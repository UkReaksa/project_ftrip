import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// import Dashbord from "../components/home/main_home.vue";
import Dashbord_about from "../components/about/Dashbord_about.vue";
import infomation from "../components/home/All_infomation.vue";
import events from "../components/events/Events_dashbord.vue";
import partner from "../components/partner/Partner_dashbord.vue";
import news from "../components/events/News.vue";
import Partner_infor from "@/components/partner/Partner_infor.vue";
import dashbord_service from "../components/service/dashbord_service.vue";
import test from "@/test.vue";


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
      path: "/event/:index",
      name: "News",
      component: news,
      props: true
    },
    {
      path: "/partner",
      name: "partner",
      component: partner,
    },
    {
      path: "/partner/:index",
      name: "Partner_infor",
      component: Partner_infor,
      props: true
    },
    {
      path: "/dashbord_service",
      name: "dashbord_service",
      component: dashbord_service,
    },
    {
      path: "/test",
      name: "test",
      component: test,
    }
  ],
});

export default router;
