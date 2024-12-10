import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.css";
import "@repo/web-kit/globals.css";
import "@repo/web-kit/globals.css";
import { config } from './config';
import { ReactQueryProvider } from "@repo/web-kit/providers/react-query-provider";
import { AuthProvider } from "@repo/web-kit/providers/auth-provider";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider domain={config.auth.domain} clientId={config.auth.clientId} audience={config.auth.audience}>
      <ReactQueryProvider>
        <App />
      </ReactQueryProvider>
    </AuthProvider>
  </StrictMode>
)

