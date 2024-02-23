import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";


const UserLayout = () => {
  return (
    <>
   <Navbar/>
      <div className="min-h-[calc(100vh-190px)]">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default UserLayout;
