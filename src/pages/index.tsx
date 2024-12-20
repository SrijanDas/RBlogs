import { lazy } from "react";
import { withSuspense } from "../hooks/with-suspense";

export const Home = withSuspense(lazy(() => import("./home")));
export const Login = withSuspense(lazy(() => import("./login")));
export const Register = withSuspense(lazy(() => import("./register")));
export const BlogsPage = withSuspense(lazy(() => import("./blogs")));
export const BlogPage = withSuspense(lazy(() => import("./blog")));
