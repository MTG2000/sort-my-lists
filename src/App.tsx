import { Outlet } from "react-router-dom";
import "./App.css";
import MigrateData from "./components/MigrateData/MigrateData";
function App() {
  return (
    <MigrateData>
      <Outlet />
    </MigrateData>
  );
}

export default App;
