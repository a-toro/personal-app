import {
  Home,
  Settings,
  Wallet,
  BanknoteArrowDown,
  HandCoins,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import LogoutButton from "./auth/LogoutButton";

// Menu items.
const items = [
  {
    title: "Inicio",
    url: "#",
    icon: Home,
  },
  {
    title: "Gastos",
    url: "#",
    icon: Wallet,
  },
  {
    title: "Categorias gastos",
    url: "#",
    icon: () => <BanknoteArrowDown color="#f50000" />,
  },
  {
    title: "Ingresos",
    url: "#",
    icon: HandCoins,
  },
  {
    title: "Categorias ingresos",
    url: "#",
    icon: () => <BanknoteArrowDown color="#0b5b18" />,
  },
  {
    title: "Configuración",
    url: "#",
    icon: () => <Settings color="#0b5b18" />,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gastos App</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {/* <SidebarMenuItem key={"settings"}>
            <SidebarMenuButton asChild>
              <a href={"#"}>
                <Settings />
                <span>Configuración</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem> */}
          <SidebarMenuItem key={"logout"}>
            <SidebarMenuButton asChild>
              <LogoutButton />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
