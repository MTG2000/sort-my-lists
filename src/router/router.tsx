import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { lazy } from "react";

const HomePage = lazy(() => import("@/pages/HomePage/HomePage"));
const AllListsPage = lazy(() => import("@/pages/AllListsPage/AllListsPage"));
const ListPage = lazy(() => import("@/pages/ListPage/ListPage"));

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/lists",
        element: <AllListsPage />,
      },
      {
        path: "/list",
        element: <AllListsPage />,
      },
      {
        path: "/list/:slug",
        element: <ListPage />,
      },
    ],
  },
]);
