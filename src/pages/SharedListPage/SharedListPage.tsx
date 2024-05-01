import { Game } from "@/core/models";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";

export default function SharedListPage() {
  const loaderData = useLoaderData() as { games: Game[]; title: string | null };

  if (!loaderData.games) throw new Error("Games not found");

  useDocumentTitle(loaderData.title ? loaderData.title : "Shared List");

  return (
    <div>
      <div className="page-container py-8">
        {loaderData.title && (
          <h1 className="text-4xl mb-8">
            <span className="text-2xl">Shared List: </span> {loaderData.title}
          </h1>
        )}
        <ul className="flex flex-col gap-3">
          {loaderData.games.map((game, idx) => (
            <li key={game.id} className="flex gap-4 glass-card p-4 rounded-2xl">
              <div className="flex flex-col justify-around">
                <div>
                  <span className="w-[36px] text-center bg-gray-900 bg-opacity-90 inline-block rounded-sm border-none text-lg font-bold">
                    {idx + 1}
                  </span>
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
                  <h3 className="font-bold text-2xl">{game.name}</h3>
                  {game.summary && (
                    <p className="line-clamp-2 max-w-[70ch] mt-3">
                      {game.summary}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
