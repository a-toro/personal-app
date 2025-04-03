import axios from "@/api/axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthState } from "@/context/AuthProvider";
import { ClientPaths } from "@/lib/routerPaths";

const SESSION_PATH = "/auth/session";

export function useValidateSession(setAuth: (auth: AuthState | null) => void) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  //   const { setAuth } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const session = await axios.get(SESSION_PATH, {
          withCredentials: true,
        });
        if (session.status === 200) {
          const { user, accessToken } = session.data || {};
          if (user && accessToken) {
            setAuth({
              user: {
                id: user?.id,
                email: user?.email,
                role: user?.role,
                name: user?.name,
              },
              accessToken,
            });

            if (location.pathname === ClientPaths.auth) {
              navigate(ClientPaths.home, { replace: true }); // Usa replace: true
            }
          } else if (location.pathname !== ClientPaths.auth) {
            // Si no hay usuario ni token, redirige a /auth
            navigate(ClientPaths.auth, {
              state: { from: location },
              replace: true,
            });
          }
        } else {
          setAuth(null);
          navigate(ClientPaths.auth, {
            state: { from: location },
            replace: true,
          });
        }
      } catch (error) {
        console.log(error);
        // En caso de error, asegúrate de que estén en la página de autenticación
        if (location.pathname !== ClientPaths.auth) {
          navigate(ClientPaths.auth, {
            state: { from: location },
            replace: true,
          });
        }
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading };
}
