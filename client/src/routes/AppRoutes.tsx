import AuthPage from "@/pages/AuthPage";
import { Route, Routes } from "react-router";
import RequiereAuth from "./RequiereAuth";

const ROLES = {
  Admin: "admin",
  User: "user",
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="auth" element={<AuthPage />}></Route>
      <Route
        element={<RequiereAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}
      >
        <Route path="/home" index element={<h1>Home</h1>}></Route>
      </Route>
    </Routes>
  );
}
