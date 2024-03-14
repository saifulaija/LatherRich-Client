// import { createBrowserRouter } from "react-router-dom";

// import NotFound from "../pages/notFound/NotFound";

// import ProductCategory from "../pages/productCategory/ProductCategory";
// import Login from "../pages/login/Login";

// import Home from "../components/home/Home";
// import CategoryLayout from "../components/layout/CategoryLayout";
// import HomeLayout from "../components/layout/HomeLayout";
// import ProductDetails from "../pages/productDetails/ProductDetails";
// import ExchangeAndComplain from "../pages/exchangeAndComplaince/ExchangeAndComplain";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomeLayout />,
//     errorElement: <NotFound />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "product/:id",
//         element: <ProductDetails />,
//       },

//       {
//         path: "login",
//         element: <Login />,
//       },
//       {
//         path: "complain",
//         element: <ExchangeAndComplain />,
//       },
//     ],
//   },
//   {
//     path: "/products",
//     element: <CategoryLayout />,
//     children: [
//       {
//         path: ":category",
//         element: <ProductCategory />,
//       },
//     ],
//   },
// ]);

// export default router;

import { createBrowserRouter } from "react-router-dom";

import NotFound from "../pages/notFound/NotFound";

import ProductCategory from "../pages/productCategory/ProductCategory";
import Login from "../pages/login/Login";

import Home from "../components/home/Home";
import CategoryLayout from "../components/layout/CategoryLayout";
import HomeLayout from "../components/layout/HomeLayout";
import ProductDetails from "../pages/productDetails/ProductDetails";
import ExchangeAndComplain from "../pages/exchangeAndComplaince/ExchangeAndComplain";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import Register from "../pages/register/Register";
import OrderSuccess from "../pages/orderSucces/OrderSuccess";

import SearchResultProduct from "../components/searchResult/SearchResultProduct";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";
import NewApp from "../NewApp";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.route";
import { userPaths } from "./user.route";

const router = createBrowserRouter([

  {
    path: "/superAdmin",
    element: (
      <ProtectedRoute role="superAdmin">
        <NewApp />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <NewApp />
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths),
  },
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
        path: "complain",
        element: <ExchangeAndComplain />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "order/:id",
        element: <OrderSuccess />,
      },
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
      {
        path:"search",
        element:<SearchResultProduct/>
      }
    ],
  },
]);

export default router;
