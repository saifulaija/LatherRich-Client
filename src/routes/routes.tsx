import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/notFound/NotFound";
import Products from "../pages/products/Products";
import ProductCategory from "../pages/productCategory/ProductCategory";
import Login from "../pages/login/Login";

const router=createBrowserRouter([
    {
       path:'/',
       element:<App/>,
       errorElement:<NotFound/>,
       children:[
        {
            path:'/',
            element:<Products/>
        },
        {
            path:'/:category',
            element:<ProductCategory/>
        },
        {
            path:'login',
            element:<Login/>
        }
       ]
        
    }
])

export default router