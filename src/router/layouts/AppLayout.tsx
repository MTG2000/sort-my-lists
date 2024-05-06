import AppDrawer from "@/components/AppDrawer/AppDrawer";
import Footer from "@/components/Footer/Footer";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { ListsManagerProvider } from "@/lib/contexts/ListsManager.context";
import { Suspense } from "react";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div id="app" className="min-h-screen flex flex-col">
      <ListsManagerProvider>
        <AppDrawer />
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
      </ListsManagerProvider>
      <Footer />
    </div>
  );
}
