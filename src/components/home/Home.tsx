import Banner from "../banner/Banner";

import MenProduct from "../mensProduct/MenProduct";
import WomenProduct from "../womenProduct/WomenProduct";
import KidProducts from "../kidsProduct/KidProducts";

import SubBanner from "../subBanner/SubBanner";

import CustomeDivider from "../customeDivider/CustomeDivider";

import { motion } from "framer-motion";
import CookieBanner from "../cookieBanner/CookieBanner";
import NewBestSellingProducts from "../bestSellingProduct/NewBestSelling";

const Home = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <Banner />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5 }}
      >
        <SubBanner />
      </motion.div>
      <div className="mt-12 mb-12 ">
        <CustomeDivider title={"best selling products"} />
      </div>
      <NewBestSellingProducts />
      <div className="mt-12 mb-12 ">
        <CustomeDivider title={" Men's Collection"} />
      </div>
      <MenProduct />

      <div className="mt-12 mb-12 ">
        <CustomeDivider title={" Women's Collection"} />
      </div>

      <CookieBanner />

      <WomenProduct />
      <div className="mt-12 mb-12">
        <CustomeDivider title={" Kid's Collection"} />
      </div>
      <KidProducts />
    </>
  );
};

export default Home;
