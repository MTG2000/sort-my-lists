import { Outlet } from "react-router-dom";
import "./App.css";
import { ListsManagerProvider } from "./lib/contexts/ListsManager.context";

function App() {
  return (
    <div id="app">
      <ListsManagerProvider>
        <Outlet />
      </ListsManagerProvider>
    </div>
  );
}

export default App;
