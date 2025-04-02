import LogoutButton from "@/components/auth/LogoutButton";
// import { Button } from "@/components/ui/button";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="w-screen h-screen overflow-x-hidden flex flex-col p-5">
      <header className="w-full flex justify-end">
        <LogoutButton />
      </header>
      <Outlet />
    </div>
  );
}
