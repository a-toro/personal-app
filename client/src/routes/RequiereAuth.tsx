import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";

interface RequiereAuthProps {
  allowedRoles: string[];
}

export default function RequiereAuth({ allowedRoles }: RequiereAuthProps) {
  const { auth } = useAuth();
  const location = useLocation();

  return allowedRoles.includes(auth?.user?.role as string) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to={"/no-autorizado"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/auth"} state={{ from: location }} replace />
  );
}
