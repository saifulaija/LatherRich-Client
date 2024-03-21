import Banner from "../banner/Banner";

import MenProduct from "../mensProduct/MenProduct";
import WomenProduct from "../womenProduct/WomenProduct";
import KidProducts from "../kidsProduct/KidProducts";

import SubBanner from "../subBanner/SubBanner";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";
import { useTopBarLoader } from "../../utils/topBarLoader";
import CustomeDivider from "../customeDivider/CustomeDivider";
import BestSellingProducts from "../bestSellingProduct/BestSellingProducts";
import { motion } from "framer-motion";

const Home = () => {
  const [progress, setProgress] = useState(0);
  useTopBarLoader(setProgress);

  return (
    <div className="pt-8">
      <LoadingBar progress={progress} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5 }}
      >
        <Banner />
      </motion.div>
      <SubBanner />
      <div className="mt-12 mb-12 ">
        <CustomeDivider title={"best selling products"} />
      </div>

      <BestSellingProducts />
      <div className="mt-12 mb-12 ">
        <CustomeDivider title={" Men's Collection"} />
      </div>
      <MenProduct />

      <div className="mt-12 mb-12 ">
        <CustomeDivider title={" Women's Collection"} />
      </div>

      <WomenProduct />
      <div className="mt-12 mb-12">
        <CustomeDivider title={" Kid's Collection"} />
      </div>
      <KidProducts />
    </div>
  );
};

export default Home;
