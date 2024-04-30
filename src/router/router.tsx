import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "@/pages/HomePage/HomePage";
import AllListsPage from "@/pages/AllListsPage/AllListsPage";
import ListPage from "@/pages/ListPage/ListPage";
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

/**
 *  / => home page
 *  /lists | /list => All lists
 *  /list/:slug => List page
 *
 */
