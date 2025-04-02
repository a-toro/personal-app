import { createContext, ReactNode, useState } from "react";

const AuthContext = createContext({});

export default function AuthProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
