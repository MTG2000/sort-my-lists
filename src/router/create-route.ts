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

type Section = "games" | "movies" | "books";

export const createRoute = (route: Route, section: Section) => {
  if (route.type === "homepage") {
    return `/${section ?? ""}`;
  }
  if (route.type === "list") {
    return `/${section}/list/${route.slug}`;
  }
  if (route.type === "all-lists") {
    return `/${section}/lists`;
  }

  throw new Error("Invalid route");
};
