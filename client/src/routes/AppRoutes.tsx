// import AuthPage from "@/pages/AuthPage";
import { Route, Routes } from "react-router";
import RequiereAuth from "./RequiereAuth";
import { lazy } from "react";
import { ROLES } from "@/lib/constants";
import Home from "@/components/Home";
import { ClientPaths } from "@/lib/routerPaths";
import ExpenseCategoryPage from "@/pages/ExpenseCategoryPage";
// import MainLayout from "@/layouts/Layout";

const AuthPage = lazy(() => import("@/pages/AuthPage"));
const MainLayout = lazy(() => import("@/layouts/Layout"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="auth" element={<AuthPage />}></Route>
      <Route element={<MainLayout />}>
        <Route
          element={<RequiereAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}
        >
          <Route path="/" index element={<Home />}></Route>
          <Route
            path={ClientPaths.expenseCategory}
            index
            element={<ExpenseCategoryPage />}
          ></Route>
        </Route>
        <Route
          path="*"
          element={<h1 className="text-2xl font-semibold">Not found page</h1>}
        />
      </Route>
    </Routes>
  );
}
