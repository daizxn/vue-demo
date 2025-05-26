import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "latest",
      component: () => import("../views/Latest.vue"),
    },

    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },

    // {
    //   path: "/period-:id",
    //   name: "period",
    //   component: (route) => {
    //     const id = route.params.id;
    //     return import(`../views/news/period-${id}_*.vue`);
    //   },
    // },
    {
      path: "/period-1",
      name: "period-1",
      component: () => import("../views/news/period-1_2023-07-01_2023-07-31.vue"),
    },
    {
      path: "/period-2",
      name: "period-2",
      component: () => import("../views/news/period-2_2023-08-01_2023-08-31.vue"),
    },
    {
      path: "/period-3",
      name: "period-3",
      component: () => import("../views/news/period-3_2023-09-01_2023-09-31.vue"),
    },
    {
      path: "/period-4",
      name: "period-4",
      component: () => import("../views/news/period-4_2025-05-09_2023-05-16.vue"),
    },
  ],
});

export default router;
