import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { Button } from "@/components/ui/button";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <div className="w-screen h-screen overflow-x-hidden flex flex-col p-5">
        <div className="flex flex-row flex-1">
          <AppSidebar />
          <SidebarTrigger />
          <div className="w-full flex">
            <main className="p-1 flex flex-col flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
