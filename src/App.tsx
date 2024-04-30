import { Outlet } from "react-router-dom";
import "./App.css";
import { ListsManagerProvider } from "./lib/contexts/ListsManager.context";
import AppDrawer from "./components/AppDrawer/AppDrawer";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div id="app">
      <ListsManagerProvider>
        <AppDrawer />
        <Outlet />
      </ListsManagerProvider>
      <Footer />
    </div>
  );
}

export default App;
