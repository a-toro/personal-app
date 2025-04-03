import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { closeSnackbar, SnackbarProvider } from "notistack";
import { Button } from "./components/ui/button.tsx";
import { X } from "lucide-react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <SnackbarProvider
          autoHideDuration={5000}
          maxSnack={5}
          anchorOrigin={{
            horizontal: "right",
            vertical: "bottom",
          }}
          action={(snackbarId) => (
            <Button
              size={"icon"}
              className="bg-transparent text-white"
              onClick={() => closeSnackbar(snackbarId)}
            >
              <X />
            </Button>
          )}
        >
          <AuthProvider>
            <App />
          </AuthProvider>
        </SnackbarProvider>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
