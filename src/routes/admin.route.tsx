// eslint-disable-next-line  @typescript-eslint/no-explicit-any

import AdminDashboard from "../components/Dashboard/AdminDashboard";
import SellsHistory from "../pages/orderManagement/SellsHistory";
import ShowOrder from "../pages/orderManagement/ShowOrder";
import AddProduct from "../pages/productManagement/AddProduct";
import ShowProduct from "../pages/productManagement/ShowProduct";


export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard/>,
  },
  
  {
    name: "Product Management",
    children: [
      {
        name: "Create Product",
        path: "create-product",
        element: <AddProduct />,
      },
      {
        name: "Show Products",
        path: "show-product",
        element: <ShowProduct/>,
      },
     
    ],
  },
  {
    name: "Order Management",
    children: [
      {
        name: "Show Order",
        path: "show-order",
        element: <ShowOrder/>,
      },
      {
        name: "Sells History",
        path: "sells-history",
        element: <SellsHistory />,
      },
    ],
  },
 
];
