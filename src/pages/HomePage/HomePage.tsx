import { Button } from "@/components/Button/Button";
import { useListsManager } from "@/lib/contexts/ListsManager.context";
import { useNavigate } from "@/lib/hooks/useNavigate";

export default function HomePage() {
  const { lists, createNewList } = useListsManager();
  const navigate = useNavigate();

  const handleCreateNewList = () => {
    const list = createNewList(`Untitled List ${lists.length + 1}`);
    navigate({
      type: "list",
      slug: list.slug,
    });
  };

  return (
    <main className="page-container">
      <section
        id="hero"
        className="min-h-[min(90vh,900px)] flex flex-col gap-16 justify-center items-center"
      >
        <h1 className="text-8xl">Smart Games Rater</h1>
        <p className="text-xl max-w-[60ch]">
          If you have a list of 1000 games & you want to add a new one but not
          sure where exactly, we will ask you to compare it against at MAXIMUM
          10 other games, & we will figure out the exact place it should be in!
        </p>

        {lists.length === 0 && (
          <div>
            <Button onClick={handleCreateNewList}>
              Create Your First List
            </Button>
            <p className="text-gray-400 text-center italic mt-2">
              *It's totally free!
            </p>
          </div>
        )}

        {lists.length > 0 && (
          <div>
            <p className="text-lg mb-3">My Lists:</p>
            <ul className="flex flex-col gap-3">
              {lists.map((list) => (
                <li key={list.id}>
                  <Button
                    variant="whiteOutlined"
                    fullWidth
                    onClick={() => navigate({ type: "list", slug: list.slug })}
                  >
                    {list.name}
                  </Button>
                </li>
              ))}
              <li>
                <Button fullWidth onClick={handleCreateNewList}>
                  + Create New List
                </Button>
              </li>
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}
