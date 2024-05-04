import { Game } from "@/core/models";
import { useGamesList } from "@/lib/contexts/GamesList.context";
import { AnimatePresence, Reorder, useDragControls } from "framer-motion";

export default function OrderedGamesList() {
  const { games, setNewGamesOrder } = useGamesList();

  const onReorder = (newOrder: Game[]) => {
    setNewGamesOrder(newOrder);
  };

  return (
    <Reorder.Group
      values={games}
      axis="y"
      onReorder={onReorder}
      layoutScroll
      className="flex flex-col gap-3"
    >
      <AnimatePresence>
        {games.map((game, idx) => (
          <GameItem key={game.id} game={game} idx={idx} />
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
}

const GameItem = ({ game, idx }: { game: Game; idx: number }) => {
  const { shiftGameToNewIndex, removeGame } = useGamesList();
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      key={game.id}
      value={game}
      dragControls={dragControls}
      dragListener={false}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex gap-4 glass-card p-4 rounded-2xl"
    >
      <div className="flex flex-col justify-around">
        <div>
          <button
            className="block mx-auto hover:scale-110 active:scale-90 cursor-grab active:cursor-grabbing touch-none"
            aria-label="Drag to move game"
            onPointerDown={(e) => dragControls.start(e)}
          >
            <svg
              fill="gray"
              width="20"
              height="20"
              viewBox="0 0 1920 1920"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M686.211 137.143v-.137l68.572.137H686.21Zm0 1508.571c75.566 0 137.143 61.577 137.143 137.143S761.777 1920 686.211 1920c-75.702 0-137.142-61.577-137.142-137.143s61.44-137.143 137.142-137.143Zm548.572 0c75.566 0 137.143 61.577 137.143 137.143S1310.349 1920 1234.783 1920c-75.703 0-137.143-61.577-137.143-137.143s61.44-137.143 137.143-137.143ZM686.21 1097.143c75.566 0 137.143 61.577 137.143 137.143 0 75.565-61.577 137.143-137.143 137.143-75.702 0-137.142-61.578-137.142-137.143 0-75.566 61.44-137.143 137.142-137.143Zm548.572 0c75.566 0 137.143 61.577 137.143 137.143 0 75.565-61.577 137.143-137.143 137.143-75.703 0-137.143-61.578-137.143-137.143 0-75.566 61.44-137.143 137.143-137.143ZM686.21 548.57c75.566 0 137.143 61.578 137.143 137.143 0 75.566-61.577 137.143-137.143 137.143-75.702 0-137.142-61.577-137.142-137.143 0-75.565 61.44-137.143 137.142-137.143Zm548.572 0c75.566 0 137.143 61.578 137.143 137.143 0 75.566-61.577 137.143-137.143 137.143-75.703 0-137.143-61.577-137.143-137.143 0-75.565 61.44-137.143 137.143-137.143ZM686.21 0c75.566 0 137.143 61.577 137.143 137.143S761.776 274.286 686.21 274.286c-75.702 0-137.142-61.577-137.142-137.143S610.509 0 686.21 0Zm548.503 0c75.566 0 137.143 61.577 137.143 137.143s-61.577 137.143-137.143 137.143c-75.565 0-137.143-61.577-137.143-137.143S1159.15 0 1234.714 0Z"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div>
          <input
            type="text"
            key={idx}
            defaultValue={idx + 1}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                shiftGameToNewIndex(game, parseInt(e.currentTarget.value) - 1);
              }
            }}
            className="w-[36px] text-center bg-transparent hover:bg-gray-900 focus:bg-gray-900 rounded-sm border-none text-lg font-bold"
          />
        </div>
      </div>
      <div key={game.id} className="flex max-sm:flex-col grow gap-4">
        <img
          src={game.cover?.url}
          alt=""
          width={120}
          className="object-cover mx-auto"
        />
        <div className="grow">
          <h3 className="font-bold text-2xl max-md:text-center">{game.name}</h3>
          {game.summary && (
            <p className="line-clamp-2 max-md:hidden max-w-[70ch] mt-3">
              {game.summary}
            </p>
          )}
        </div>
      </div>
      <div>
        <button
          onClick={() => removeGame(game)}
          className="text-gray-500 p-3 rounded-full hover:text-gray-100"
          aria-label="remove game"
        >
          <svg
            width="20px"
            height="20px"
            viewBox="-0.5 0 25 25"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 21.32L21 3.32001"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 3.32001L21 21.32"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </Reorder.Item>
  );
};
