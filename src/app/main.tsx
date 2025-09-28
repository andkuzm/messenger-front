import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ChakraProvider} from '@chakra-ui/react'
import {customSystem} from "../lib/customSystem.ts";
import {Provider} from "react-redux";
import {store} from "@/stores/store.ts";

const queryClient = new QueryClient()
createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <StrictMode>
          <ChakraProvider value={customSystem}>
              <Provider store={store}>
                  <App />
              </Provider>
          </ChakraProvider>
      </StrictMode>
    </QueryClientProvider>
);
