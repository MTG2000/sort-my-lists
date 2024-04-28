import { useGamesList } from "@/lib/contexts/GamesList.context";

export default function OrderedGamesList() {
  const { games, shiftGameOrder, shiftGameToNewIndex, removeGame } =
    useGamesList();

  return (
    <div className="flex flex-col gap-3">
      {games.map((game, idx) => (
        <div key={game.id} className="flex gap-4 bg-gray-800 p-4 rounded-sm">
          <div className="flex flex-col justify-around">
            <div>
              <button
                className="block mx-auto active:scale-90"
                aria-label="Take game up"
                onClick={() => shiftGameOrder(game, "up")}
              >
                🔼
              </button>
              <button
                className="block mx-auto active:scale-90"
                aria-label="Take game down"
                onClick={() => shiftGameOrder(game, "down")}
              >
                🔽
              </button>
            </div>
            <div>
              <input
                type="text"
                key={idx}
                defaultValue={idx + 1}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    shiftGameToNewIndex(
                      game,
                      parseInt(e.currentTarget.value) - 1
                    );
                  }
                }}
                className="w-[36px] text-center bg-transparent hover:bg-gray-900 focus:bg-gray-900 rounded-sm border-none text-lg font-bold"
              />
            </div>
          </div>
          <div key={game.id} className="flex grow gap-2">
            <img
              src={game.cover?.url}
              alt=""
              width={120}
              className="object-cover"
            />
            <div>
              <h3 className="font-bold text-lg">{game.name}</h3>
              {game.summary && <p>{game.summary.slice(0, 50)}</p>}
            </div>
          </div>
          <div>
            <button onClick={() => removeGame(game)}>❌</button>
          </div>
        </div>
      ))}
    </div>
  );
}
