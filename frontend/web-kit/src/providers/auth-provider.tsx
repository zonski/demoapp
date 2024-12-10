import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';

interface Props { 
  domain: string,
  clientId: string,
  audience: string,
  children: ReactNode
} 

export const AuthProvider = ({ children, domain, clientId, audience }: Props) => (
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      audience: audience,
      redirect_uri: window.location.origin
    }}
  >
    {children}
  </Auth0Provider>
);
