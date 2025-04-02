import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
