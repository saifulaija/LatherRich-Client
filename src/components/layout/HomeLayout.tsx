import { Outlet } from "react-router-dom";

import Header from "../header/NewHeader";
import Footer from "../footer/Footer";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <div className="mt-[60px]">
        <Outlet />
        <Footer/>
      </div>
    </>
  );
};

export default HomeLayout;
