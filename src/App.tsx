import "./App.css";
import { GameSearchInput } from "./components/GameSearchInput/GameSearchInput";
import OrderedGamesList from "./components/OrderedGamesList/OrderedGamesList";
import { GamesListProvider } from "./lib/contexts/GamesList.context";
import { CompareGamesModal } from "./components/CompareGamesModal/CompareGamesModal";

function App() {
  return (
    <div id="app">
      <GamesListProvider>
        <div className="space-y-4">
          <GameSearchInput />
          <OrderedGamesList />
        </div>
        <CompareGamesModal />
      </GamesListProvider>
    </div>
  );
}

export default App;
