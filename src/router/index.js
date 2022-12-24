import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Dashboard from "../pages/Dashboard.vue";
import Create from "../pages/Create.vue";
import Edit from "../pages/Edit.vue";

const history = createWebHistory();

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: Edit,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history,
  routes,
});

router.beforeEach((to, from, next) => {
  let token = window.sessionStorage.getItem("token") !== null;
  if (to.name === "Login" && token) {
    next({ name: "Dashboard" });
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next({
        path: "/",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
