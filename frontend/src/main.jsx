import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { PostContextProvider } from "./Context/PostContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// create a new Client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <PostContextProvider>
        <App />
      </PostContextProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
