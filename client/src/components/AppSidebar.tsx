import {
  Home,
  Settings,
  Wallet,
  BanknoteArrowDown,
  HandCoins,
  Users,
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
import { useAuth } from "@/hooks/useAuth";
import { ROLES } from "@/lib/constants";
import { ClientPaths } from "@/lib/routerPaths";

// Menu items.
const items = [
  {
    title: "Inicio",
    url: ClientPaths.home,
    icon: Home,
  },
  {
    title: "Gastos",
    url: ClientPaths.expenses,
    icon: Wallet,
  },
  {
    title: "Categorias gastos",
    url: ClientPaths.expenseCategory,
    icon: () => <BanknoteArrowDown color="#f50000" />,
  },
  {
    title: "Ingresos",
    url: ClientPaths.incomes,
    icon: HandCoins,
  },
  {
    title: "Categorias ingresos",
    url: ClientPaths.incomesCategory,
    icon: () => <BanknoteArrowDown color="#0b5b18" />,
  },
  {
    title: "Configuración",
    url: ClientPaths.settings,
    icon: () => <Settings color="#0b5b18" />,
  },
];

export function AppSidebar() {
  const { auth } = useAuth();
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
        {auth?.user?.role?.includes(ROLES.Admin) && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem key={"users"}>
                  <SidebarMenuButton asChild>
                    <a href={"#"}>
                      <Users />
                      <span>Usuarios</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
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
