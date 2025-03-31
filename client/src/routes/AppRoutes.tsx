import AuthPage from "@/pages/AuthPage";
import { Route, Routes } from "react-router";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="auth" element={<AuthPage />}></Route>
      <Route index element={<h1>Home</h1>}></Route>
    </Routes>
  );
}
