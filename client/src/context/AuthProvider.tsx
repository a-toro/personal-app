import axios from "@/api/axios";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router";

interface AuthState {
  user?: {
    id: string;
    email: string;
    role: string;
  };
  accessToken?: string;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: Dispatch<SetStateAction<AuthState>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_PATH = "/auth/session";

export function AuthProvider({ children }: { readonly children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

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
              },
              accessToken,
            });

            if (location.pathname === "/auth") {
              navigate("/", { replace: true }); // Usa replace: true
            }
          } else if (location.pathname !== "/auth") {
            // Si no hay usuario ni token, redirige a /auth
            navigate("/auth", {
              state: { from: location },
              replace: true,
            });
          }
        } else {
          navigate("/auth", {
            state: { from: location },
            replace: true,
          });
        }
      } catch (error) {
        console.log(error);
        // En caso de error, asegúrate de que estén en la página de autenticación
        if (location.pathname !== "/auth") {
          navigate("/auth", {
            state: { from: location },
            replace: true,
          });
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="w-screen h-screen flex justify-center items-center bg-slate-300 opacity-75 z-40 text-black">Cargando...</div>;

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
