import { CompareItemsModal } from "@/components/CompareItemsModal/CompareItemsModal";
import { ItemSearchInput } from "@/components/ItemSearchInput/ItemSearchInput";
import ListTitleInput from "@/components/ListTitleInput/ListTitleInput";
import OrderedItemsList from "@/components/OrderedItemsList/OrderedItemsList";
import ShareListButton from "@/components/ShareListButton/ShareListButton";
import { ItemsListProvider } from "@/lib/contexts/ItemsList.context";
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
      <ItemsListProvider listKey={list.id}>
        <div className="page-container py-8">
          <div className="space-y-4">
            <div className="flex items-center justify-end">
              <div className="grow">
                <ListTitleInput
                  value={list.name}
                  onUpdate={handleUpdateListName}
                />
              </div>
              <ShareListButton listTitle={list.name} />
            </div>
            <ItemSearchInput />
            <OrderedItemsList />
          </div>
          <CompareItemsModal />
        </div>
      </ItemsListProvider>
    </div>
  );
}
