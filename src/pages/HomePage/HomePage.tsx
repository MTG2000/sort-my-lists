import { Button } from "@/components/Button/Button";
import FAQ from "@/components/FAQ/FAQ";
import HeroTitle from "@/components/HeroTitle/HeroTitle";
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
        className="min-h-[min(90vh,900px)] flex flex-col gap-16 justify-center pt-[min(30vh,300px)]"
      >
        <HeroTitle />
        <p className="text-2xl max-w-[60ch] leading-9">
          Disorganized games backlog? <br />
          Confused where to add the new one to your growing list? <br />
          Say goodbye to the guesswork!
          <br /> Using <span className="italic">SortMyGames</span>, find the
          perfect spot to put a game even amid 1000-long list, by answering less
          that 10 comparisons!
        </p>

        {lists.length === 0 && (
          <div className="self-center">
            <Button onClick={handleCreateNewList} size="lg">
              Create Your First List
            </Button>
            <p className="text-gray-400 italic mt-2">*It's completely free!</p>
          </div>
        )}

        {lists.length > 0 && (
          <div className="self-center w-full max-w-[500px]">
            <p className="text-lg mb-3">My Lists:</p>
            <ul className="flex flex-col gap-3">
              {lists.map((list) => (
                <li key={list.id}>
                  <Button
                    size="lg"
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
      <section className="min-h-[min(90vh,900px)] gap-16 justify-center pt-[min(30vh,200px)]">
        <FAQ />
      </section>
    </main>
  );
}
