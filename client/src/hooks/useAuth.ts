import AuthContext from "@/context/AuthProvider";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("No existe un contexto para usar el useAuth");
  return context;
};
