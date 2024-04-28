import API from "@/services/api";
import { useEffect } from "react";
import {
  StylesConfig,
  components,
  OptionProps,
  ValueContainerProps,
  GroupBase,
} from "react-select";
import AsyncSelect from "react-select/async";

export default function Search() {
  useEffect(() => {
    fetchOptions("witcher");
  }, []);

  return <AsyncSelect cacheOptions defaultOptions loadOptions={fetchOptions} />;
}

async function fetchOptions(inputValue: string) {
  const data = await API.gamesApi.searchGames(inputValue);
  console.log(data);

  return data;
}
