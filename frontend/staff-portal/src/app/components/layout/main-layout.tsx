import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar";
import { Toaster } from "@repo/web-kit/components/ui/sonner";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <Toaster toastOptions={{
        classNames: {
          error: 'bg-red-200',
        },
      }} />
    </div>
  );
};

