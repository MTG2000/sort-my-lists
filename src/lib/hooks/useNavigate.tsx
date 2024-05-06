import { createRoute } from "@/router/create-route";
import { useCallback } from "react";
import {
  NavigateOptions,
  useNavigate as useReactRouterNavigate,
} from "react-router-dom";
import { useSectionApis } from "../contexts/SectionApisConfig.context";

type AvailableRoute = Parameters<typeof createRoute>[0];

export const useNavigate = () => {
  const _navigate = useReactRouterNavigate();
  const { section } = useSectionApis();

  const navigate = useCallback(
    (route: AvailableRoute, options?: NavigateOptions) => {
      _navigate(createRoute(route, section), options);
    },
    [_navigate, section]
  );

  return navigate;
};
