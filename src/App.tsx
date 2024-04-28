import "./App.css";
import { GameSearchInput } from "./components/GameSearchInput/GameSearchInput";
import { GamesListProvider } from "./lib/contexts/GamesList.context";

function App() {
  return (
    <>
      <GamesListProvider>
        <GameSearchInput
          onGameSelected={(game, position) => {
            console.log(game, position);
          }}
        />
      </GamesListProvider>
    </>
  );
}

export default App;
