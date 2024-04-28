import "./App.css";
import { GameSearchInput } from "./components/GameSearchInput/GameSearchInput";
import OrderedGamesList from "./components/OrderedGamesList/OrderedGamesList";
import { GamesListProvider } from "./lib/contexts/GamesList.context";

function App() {
  return (
    <>
      <GamesListProvider>
        <div className="space-y-4">
          <GameSearchInput />
          <OrderedGamesList />
        </div>
      </GamesListProvider>
    </>
  );
}

export default App;
