// src/providers/ReactQueryProvider.tsx
import { ReactNode, useState } from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useToast } from '../hooks/use-show-error-toast';

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const { showErrorToast } = useToast();
  const [queryClient] = useState(
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error, query) => {
          if (!query.meta || !query.meta.noErrorToast) {
            showErrorToast(error)
          }
        },
      }),
      defaultOptions: {
        queries: {
          staleTime: 60000,
          retry: 2,
        },
        mutations: {
          retry: false,
          onError: (error) => showErrorToast(error),
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
};

export { ReactQueryProvider }