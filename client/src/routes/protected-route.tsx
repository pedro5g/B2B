import { DashboardSkeleton } from "@/components/skeleton-loaders/dashboard-skeleton";
import { useAuth } from "@/hooks/api/use-auth";
import { Navigate, Outlet } from "react-router-dom";
export const ProtectedRoute = () => {
  const { data, isLoading } = useAuth();
  const user = data?.user;

  if (isLoading) return <DashboardSkeleton />;

  if (user) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};
