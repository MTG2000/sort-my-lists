import { createRoute } from "@/router/create-route";
import { Navigate } from "react-router-dom";

export default function AllListsPage() {
  return <Navigate to={createRoute({ type: "homepage" })} />;
}
