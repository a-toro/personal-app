import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { ClientPaths } from "@/lib/routerPaths";

interface RequiereAuthProps {
  allowedRoles: string[];
}

export default function RequiereAuth({ allowedRoles }: RequiereAuthProps) {
  const { auth } = useAuth();
  const location = useLocation();

  return allowedRoles.includes(auth?.user?.role as string) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate
      to={ClientPaths.unauthorized}
      state={{ from: location }}
      replace
    />
  ) : (
    <Navigate to={ClientPaths.auth} state={{ from: location }} replace />
  );
}
