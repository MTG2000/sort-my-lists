import { useContext, useMemo, useRef } from "react";
import { Item } from "@/core/models";
import { withProviders } from "@/lib/utils/hoc";
import { MenuProps } from "react-select";
import { components, OptionProps } from "react-select";
import AsyncSelect from "react-select/async";
import {
  ItemInsertPosition,
  ItemInsertPositionProvider,
} from "./item-insert-position-context";
import { useItemsList } from "@/lib/contexts/ItemsList.context";
import useFocusWithin from "@/lib/hooks/useFocusWithin";
import debounce from "debounce";
import { useSectionApis } from "@/lib/contexts/SectionApisConfig.context";

function ItemSearchInputBase() {
  const { section, fetchSearchResults } = useSectionApis();
  const { position } = useContext(ItemInsertPosition)!;
  const { addItem } = useItemsList();
  const ref = useRef<HTMLDivElement | null>(null);

  const debouncedFetchOptions = useMemo(
    () => debounce(fetchSearchResults, 300),
    [fetchSearchResults]
  );

  const isFocusedWithin = useFocusWithin(ref);

  return (
    <div ref={ref}>
      <AsyncSelect
        value={null}
        className="w-full"
        placeholder={`Start typing to search for ${section}...`}
        menuIsOpen={isFocusedWithin}
        cacheOptions={true}
        defaultOptions
        loadOptions={debouncedFetchOptions}
        components={{
          Option,
          Menu,
        }}
        onChange={(v) => addItem(v as Item, position)}
        styles={{
          menu: () => ({
            backgroundColor: "black",
            position: "absolute",
            zIndex: 10,
            marginTop: 12,
            padding: 20,
            borderRadius: 16,
            width: "100%",
          }),
        }}
      />
    </div>
  );
}

export const ItemSearchInput = withProviders(ItemInsertPositionProvider)(
  ItemSearchInputBase
);

const Menu = (props: MenuProps<Item>) => {
  const { position, onUpdateInsertPosition } = useContext(ItemInsertPosition)!;

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

const Option = (props: OptionProps<Item>) => {
  return (
    <components.Option
      {...props}
      className={`${props.className}
    ${props.isFocused ? "!bg-gray-700" : ""}
    `}
    >
      <div className="flex gap-4">
        <img
          src={props.data.image ?? ""}
          alt=""
          width={42}
          className="object-cover"
        />
        <div>
          <h3 className="font-bold text-lg">{props.data.name}</h3>
          {props.data.summary && (
            <p className="line-clamp-1 max-w-[70ch]">{props.data.summary}</p>
          )}
        </div>
      </div>
    </components.Option>
  );
};
