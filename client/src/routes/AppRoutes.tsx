// import AuthPage from "@/pages/AuthPage";
import { Route, Routes } from "react-router";
import RequiereAuth from "./RequiereAuth";
import { lazy } from "react";
import MainLayout from "@/layouts/Layout";

const AuthPage = lazy(() => import("@/pages/AuthPage"));

const ROLES = {
  Admin: "ADMIN",
  User: "USER",
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="auth" element={<AuthPage />}></Route>
      <Route element={<MainLayout />}>
        <Route
          element={<RequiereAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}
        >
          <Route path="/" index element={<h1>Home</h1>}></Route>
        </Route>
        <Route path="*" element={<h1 className="text-2xl font-semibold">Not found page</h1>} />
      </Route>
    </Routes>
  );
}
