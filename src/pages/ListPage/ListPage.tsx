import AppDrawer from "@/components/AppDrawer/AppDrawer";
import { CompareGamesModal } from "@/components/CompareGamesModal/CompareGamesModal";
import { GameSearchInput } from "@/components/GameSearchInput/GameSearchInput";
import OrderedGamesList from "@/components/OrderedGamesList/OrderedGamesList";
import { GamesListProvider } from "@/lib/contexts/GamesList.context";

export default function ListPage() {
  return (
    <div>
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
