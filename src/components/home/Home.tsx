import { Divider } from "antd";
import Products from "../../pages/products/Products";
import Banner from "../banner/Banner";
import BestSellingProduct from "../bestSellingProduct/BestSellingProduct";
import MenProduct from "../mensProduct/MenProduct";
import WomenProduct from "../womenProduct/WomenProduct";
import KidProducts from "../kidsProduct/KidProducts";
import Footer from "../footer/Footer";

const Home = () => {
  return (
    <div>
      <Banner />
      <Divider>Best Selling Products</Divider>
      <BestSellingProduct/>
      <Divider>Mens Collection</Divider>
      <MenProduct/>
      <Divider>Women's Collection</Divider>
      <WomenProduct/>
      <Divider>Kid's Collection</Divider>
      <KidProducts/>
      <Footer/>

      <Products />
    </div>
  );
};

export default Home;
