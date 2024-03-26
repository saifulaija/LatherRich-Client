import { Outlet } from "react-router-dom";
import Header from "../header/NewHeader";
import Footer from "../footer/Footer";
import GoToTop from "../goToTop/GoToTop";

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow mt-[60px]">
        <Outlet />
      </div>
      <GoToTop />

      <Footer />
    </div>
  );
};

export default HomeLayout;
