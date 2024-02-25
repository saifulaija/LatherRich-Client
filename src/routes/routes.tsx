import { createBrowserRouter } from "react-router-dom";

import NotFound from "../pages/notFound/NotFound";

import ProductCategory from "../pages/productCategory/ProductCategory";
import Login from "../pages/login/Login";

import Home from "../components/home/Home";
import CategoryLayout from "../components/layout/CategoryLayout";
import HomeLayout from "../components/layout/HomeLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element:<HomeLayout/> ,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
{
  path:'/products',
  element:<CategoryLayout/>,
  children:[
    {
      path:':category',
      element:<ProductCategory/>
    }
  ]
}

]);

export default router;
