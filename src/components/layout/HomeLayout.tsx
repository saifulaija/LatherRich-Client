import { Outlet } from "react-router-dom";
import Header from "../header/NewHeader";
import Footer from "../footer/Footer";

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow mt-[100px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
