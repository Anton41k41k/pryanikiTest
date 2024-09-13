import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { setupStore } from "./store/store.ts";

const queryClient = new QueryClient();
const store = setupStore();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CookiesProvider defaultSetOptions={{ path: " / " }}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CookiesProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
