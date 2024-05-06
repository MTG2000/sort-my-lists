import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import { lazy } from "react";
import { sharedListPageLoader } from "@/pages/SharedListPage/sharedList.loader";
import SectionLayout from "./layouts/SectionLayout";
import AppLayout from "./layouts/AppLayout";

const HomePage = lazy(() => import("@/pages/HomePage/HomePage"));
const AllListsPage = lazy(() => import("@/pages/AllListsPage/AllListsPage"));
const ListPage = lazy(() => import("@/pages/ListPage/ListPage"));
const SharedListPage = lazy(
  () => import("@/pages/SharedListPage/SharedListPage")
);

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/games" replace />,
      },
      {
        path: "/:section",
        element: <SectionLayout />,
        children: [
          {
            element: <AppLayout />,
            children: [
              {
                index: true,
                element: <HomePage />,
              },
              {
                path: "lists",
                element: <AllListsPage />,
              },
              {
                path: "list",
                element: <AllListsPage />,
              },
              {
                path: "list/:slug",
                element: <ListPage />,
              },
              {
                path: "shared",
                loader: sharedListPageLoader,
                element: <SharedListPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
