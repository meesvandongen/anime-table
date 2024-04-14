import { queryClient } from '@/api/query';
import { Outlet } from '@modern-js/runtime/router';
import { QueryClientProvider } from '@tanstack/react-query';
import './layout.css';

export default function Layout() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </div>
  );
}
