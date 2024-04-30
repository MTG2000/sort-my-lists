import { Outlet } from "react-router-dom";
import "./App.css";
import { ListsManagerProvider } from "./lib/contexts/ListsManager.context";
import AppDrawer from "./components/AppDrawer/AppDrawer";

function App() {
  return (
    <div id="app">
      <ListsManagerProvider>
        <AppDrawer />
        <Outlet />
      </ListsManagerProvider>
    </div>
  );
}

export default App;
