import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const { logout } = useAuth();

  return <Button onClick={() => logout()}>Logout</Button>;
}
