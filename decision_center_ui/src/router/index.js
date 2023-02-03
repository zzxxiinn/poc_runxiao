import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import { getToken } from "@/utils/cookie";
import Layout from "@/components/CommonLayout.vue";
import UploadPage from "@/views/UploadPage.vue";
import BoardPage from "@/views/BoardPage.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: "home",
      path: "/",
      component: Layout,
      redirect: "/upload",
      children: [
        {
          name: "upload",
          path: "/upload",
          component: UploadPage,
          meta: { title: "上传数据" },
        },
        {
          name: "board",
          path: "/board",
          component: BoardPage,
          meta: { title: "数据看板" },
        },
      ],
    },
    { name: "login", path: "/login", component: LoginPage },
  ],
});

router.beforeEach((to, from, next) => {
  const token = getToken();
  if (!token && to.name !== "login") {
    return next({ name: "login" });
  }
  next();
});

export default router;
