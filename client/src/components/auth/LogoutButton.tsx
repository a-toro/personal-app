import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button variant="outline" className="w-full" onClick={() => logout()}>
      <LogOut />
      Cerrar sesión
    </Button>
  );
}
