import { createBrowserRouter } from "react-router-dom";

import NotFound from "../pages/notFound/NotFound";

import ProductCategory from "../pages/productCategory/ProductCategory";
import Login from "../pages/login/Login";
import UserLayout from "../components/layout/UserLayout";
import Home from "../components/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:category",
        element: <ProductCategory />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
