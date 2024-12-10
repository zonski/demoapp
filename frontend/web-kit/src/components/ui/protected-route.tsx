import { ReactNode } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
