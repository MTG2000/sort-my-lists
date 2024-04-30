// import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { Outlet } from "react-router";

export default function ProtectecdLayout() {
  return (
    // <ProtectedRoute>
    <Outlet />
    // </ProtectedRoute>
  );
}
