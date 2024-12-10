import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './components/layout/main-layout';
import { Home } from './components/home/home';
import { ProtectedRoute } from '@repo/web-kit/components/ui/protected-route';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/test',
        element: <div>todo: test page</div>
      }
    ]
  }
]);
