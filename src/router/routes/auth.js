import Login from "@/views/auth/Login";
import Register from "@/views/auth/Register";
import ForgotPassword from "@/views/auth/ForgotPassword";
import ResetPassword from "@/views/auth/ResetPassword";

import BasicLayout from "@/layouts/Basic";

export default [
  {
    path: "/login",
    name: "auth.login",
    component: Login,
    meta: {
      auth: false,
      title: "Login",
      layout: BasicLayout
    }
  },
  {
    path: "/register",
    name: "auth.register",
    component: Register,
    meta: {
      auth: false,
      title: "Register",
      layout: BasicLayout
    }
  },
  {
    path: "/password/recover",
    name: "password.recover",
    component: ForgotPassword,
    meta: {
      auth: false,
      title: "Forgot Password",
      layout: BasicLayout
    }
  },
  {
    path: "/password/reset",
    name: "password.reset",
    component: ResetPassword,
    meta: {
      auth: false,
      title: "Reset Password",
      layout: BasicLayout
    }
  }
];
