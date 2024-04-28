import { useContext, useRef } from "react";
import { Game } from "@/core/models";
import { withProviders } from "@/lib/utils/hoc";
import API from "@/services/api";
import { MenuProps } from "react-select";
import { components, OptionProps } from "react-select";
import AsyncSelect from "react-select/async";
import {
  GameInsertPosition,
  GameInsertPositionProvider,
} from "./game-insert-position-context";
import { useGamesList } from "@/lib/contexts/GamesList.context";
import useFocusWithin from "@/lib/hooks/useFocusWithin";

function GameSearchInputBase() {
  const { position } = useContext(GameInsertPosition)!;
  const { addGame } = useGamesList();
  const ref = useRef<HTMLDivElement | null>(null);

  const isFocusedWithin = useFocusWithin(ref);

  return (
    <div ref={ref}>
      <AsyncSelect
        value={null}
        className="w-full"
        placeholder="Start typing to search for games..."
        menuIsOpen={isFocusedWithin}
        cacheOptions={true}
        defaultOptions
        loadOptions={fetchOptions}
        components={{
          Option,
          Menu,
        }}
        onChange={(v) => addGame(v as Game, position)}
        styles={{
          menu: () => ({
            backgroundColor: "#1e293b",
            padding: 20,
          }),
        }}
      />
    </div>
  );
}

export const GameSearchInput = withProviders(GameInsertPositionProvider)(
  GameSearchInputBase
);

async function fetchOptions(inputValue: string) {
  try {
    const data = await API.gamesApi.searchGames(inputValue);
    return data;
  } catch (error) {
    console.log("ERRORED");
    console.log(error);
    return [];
  }
}

const Menu = (props: MenuProps<Game>) => {
  const { position, onUpdateInsertPosition } = useContext(GameInsertPosition)!;

  return (
    <components.Menu {...props}>
      <div className="mb-4 flex flex-wrap gap-4">
        <div>
          <input
            type="radio"
            id="figure-out"
            name="position"
            value="figure-out"
            checked={position === "figure-out"}
            onChange={() => onUpdateInsertPosition("figure-out")}
            className="me-2"
          />
          <label htmlFor="figure-out">Figure out</label>
        </div>
        <div>
          <input
            type="radio"
            id="first"
            name="position"
            value="first"
            checked={position === "first"}
            onChange={() => onUpdateInsertPosition("first")}
            className="me-2"
          />
          <label htmlFor="first">Add to Top</label>
        </div>
        <div>
          <input
            type="radio"
            id="last"
            name="position"
            value="last"
            checked={position === "last"}
            onChange={() => onUpdateInsertPosition("last")}
            className="me-2"
          />
          <label htmlFor="last">Add to Bottom</label>
        </div>
      </div>
      {props.children}
    </components.Menu>
  );
};

const Option = (props: OptionProps<Game>) => {
  return (
    <components.Option
      {...props}
      className={`${props.className}
    ${props.isFocused ? "!bg-gray-700" : ""}
    `}
    >
      <div className="flex gap-4">
        <img
          src={props.data.cover?.url}
          alt=""
          width={42}
          className="object-cover"
        />
        <div>
          <h3 className="font-bold text-lg">{props.data.name}</h3>
          {props.data.summary && <p>{props.data.summary.slice(0, 50)}</p>}
        </div>
      </div>
    </components.Option>
  );
};
