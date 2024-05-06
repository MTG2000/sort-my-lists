import { Outlet } from "react-router-dom";
import "./App.css";
import { ListsManagerProvider } from "./lib/contexts/ListsManager.context";
import AppDrawer from "./components/AppDrawer/AppDrawer";
import Footer from "./components/Footer/Footer";
import { Suspense } from "react";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import MigrationWarningBanner from "./components/MigrationWarningBanner/MigrationWarningBanner";

function App() {
  return (
    <div id="app" className="min-h-screen flex flex-col">
      <MigrationWarningBanner />
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

export default App;
