import "./App.css";
import { GameSearchInput } from "./components/GameSearchInput/GameSearchInput";
import OrderedGamesList from "./components/OrderedGamesList/OrderedGamesList";
import { GamesListProvider } from "./lib/contexts/GamesList.context";
import { CompareGamesModal } from "./components/CompareGamesModal/CompareGamesModal";
import AppDrawer from "./components/AppDrawer/AppDrawer";

function App() {
  return (
    <div id="app">
      <GamesListProvider>
        <AppDrawer />
        <div className="page-container py-8">
          <div className="space-y-4">
            <GameSearchInput />
            <OrderedGamesList />
          </div>
          <CompareGamesModal />
        </div>
      </GamesListProvider>
    </div>
  );
}

export default App;
