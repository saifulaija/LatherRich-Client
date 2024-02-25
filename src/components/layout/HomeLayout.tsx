

import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <div className='min-h-[cal(100vh-190px)]'>
        <Outlet />
      </div>
    </>
  );
};

export default HomeLayout;
