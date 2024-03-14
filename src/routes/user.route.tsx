import UserDashboard from "../components/Dashboard/UserDashboard";
import ShowOrder from "../pages/userOrderManagement/ShowOrder";




export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "Order Management",
    children: [
      {
        name: "Show Orders",
        path: "show-user-orders",
        element: <ShowOrder />,
      },
    
    ],
  },
];
