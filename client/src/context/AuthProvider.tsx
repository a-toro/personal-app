import axios from "@/api/axios";
import Loading from "@/components/Loading";
import { useValidateSession } from "@/hooks/useValidateSession";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  // useEffect,
  useState,
} from "react";
// import { useLocation, useNavigate } from "react-router";

export interface AuthState {
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  accessToken?: string;
}

interface AuthContextType {
  auth: AuthState | null;
  setAuth: Dispatch<SetStateAction<AuthState | null>>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const SESSION_PATH = "/auth/session";
const LOGOUT_PATH = "/auth/logout";

export function AuthProvider({ children }: { readonly children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState | null>(null);

  const { loading } = useValidateSession(setAuth);

  const logout = async function () {
    try {
      const response = await axios.get(LOGOUT_PATH, { withCredentials: true });
      console.log({ logout: response });
    } catch (error) {
      console.log({ error });
    } finally {
      setAuth({});
    }
  };

  const authValue = useMemo(
    () => ({
      auth,
      setAuth,
      logout,
      loading,
    }),
    [auth, loading]
  );

  if (loading) return <Loading />;

  return (
    // <AuthContext.Provider value={{ auth, setAuth, logout, loading }}>
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
