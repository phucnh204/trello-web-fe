import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { Slide } from "@mui/material";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <BrowserRouter>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              autoHideDuration={3000}
              TransitionComponent={Slide} // Slide | Grow | Fade | Zoom
            >
              <App />
            </SnackbarProvider>
          </BrowserRouter>
        </React.StrictMode>
      </QueryClientProvider>
    </ThemeProvider>
  </>
);
