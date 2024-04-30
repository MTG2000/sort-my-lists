type Route =
  | {
      type: "homepage";
    }
  | {
      type: "list";
      slug: string;
    }
  | {
      type: "all-lists";
    };

export const createRoute = (route: Route) => {
  if (route.type === "homepage") {
    return "/";
  }
  if (route.type === "list") {
    return `/list/${route.slug}`;
  }
  if (route.type === "all-lists") {
    return "/lists";
  }

  throw new Error("Invalid route");
};
