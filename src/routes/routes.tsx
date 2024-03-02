import { createBrowserRouter } from "react-router-dom";

import NotFound from "../pages/notFound/NotFound";

import ProductCategory from "../pages/productCategory/ProductCategory";
import Login from "../pages/login/Login";

import Home from "../components/home/Home";
import CategoryLayout from "../components/layout/CategoryLayout";
import HomeLayout from "../components/layout/HomeLayout";
import ProductDetails from "../pages/productDetails/ProductDetails";
import ExchangeAndComplain from "../pages/exchangeAndComplaince/ExchangeAndComplain";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path:'complain',
        element:<ExchangeAndComplain/>
      }
    ],
  },
  {
    path: "/products",
    element: <CategoryLayout />,
    children: [
      {
        path: ":category",
        element: <ProductCategory />,
      },
    ],
  },
]);

export default router;
