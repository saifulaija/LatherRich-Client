

import { Outlet } from "react-router-dom";

import Header from "../header/NewHeader";



const HomeLayout = () => {
  return (
    <>
   <Header/>
      <div className='mt-60px'>
        <Outlet />
      </div>
    </>
  );
};

export default HomeLayout;
