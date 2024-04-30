import { createRoute } from "@/router/create-route";
import { useCallback } from "react";
import {
  NavigateOptions,
  useNavigate as useReactRouterNavigate,
} from "react-router-dom";

type AvailableRoute = Parameters<typeof createRoute>[0];

export const useNavigate = () => {
  const _navigate = useReactRouterNavigate();

  const navigate = useCallback(
    (route: AvailableRoute, options?: NavigateOptions) => {
      _navigate(createRoute(route), options);
    },
    [_navigate]
  );

  return navigate;
};
