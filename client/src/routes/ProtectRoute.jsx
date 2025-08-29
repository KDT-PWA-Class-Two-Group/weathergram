import { Navigate, Outlet } from "react-router-dom";
import { useMe } from "../api/useMe";

export default function ProtectedRoute() {
  const { data, isLoading, isError } = useMe();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !data) return <Navigate to="/login" replace />;

  return <Outlet />;
}
