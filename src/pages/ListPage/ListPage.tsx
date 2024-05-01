import { CompareGamesModal } from "@/components/CompareGamesModal/CompareGamesModal";
import { GameSearchInput } from "@/components/GameSearchInput/GameSearchInput";
import ListTitleInput from "@/components/ListTitleInput/ListTitleInput";
import OrderedGamesList from "@/components/OrderedGamesList/OrderedGamesList";
import { GamesListProvider } from "@/lib/contexts/GamesList.context";
import { useListsManager } from "@/lib/contexts/ListsManager.context";
import { useNavigate } from "@/lib/hooks/useNavigate";
import { useToast } from "@/lib/hooks/useToast";
import { extractErrorMessage } from "@/lib/utils/helperFunctions";
import { useParams } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";

export default function ListPage() {
  const params = useParams<{ slug: string }>();
  const listSlug = params.slug;

  const toast = useToast();
  const navigate = useNavigate();

  if (!listSlug) throw new Error("List slug is required");

  const { lists, updateList } = useListsManager();
  const list = lists.find((list) => list.slug === listSlug);

  if (!list) throw new Error("List not found");

  useDocumentTitle(list.name);

  const handleUpdateListName = (name: string) => {
    try {
      const updatedList = updateList(list.id, { name });
      navigate({ type: "list", slug: updatedList.slug }, { replace: true });
    } catch (error) {
      toast(extractErrorMessage(error), { type: "error" });
    }
  };

  return (
    <div key={list.id}>
      <GamesListProvider listKey={list.id}>
        <div className="page-container py-8">
          <div className="space-y-4">
            <ListTitleInput value={list.name} onUpdate={handleUpdateListName} />
            <GameSearchInput />
            <OrderedGamesList />
          </div>
          <CompareGamesModal />
        </div>
      </GamesListProvider>
    </div>
  );
}
