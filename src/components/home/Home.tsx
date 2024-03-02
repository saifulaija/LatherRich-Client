import { Divider } from "antd";

import Banner from "../banner/Banner";
import BestSellingProduct from "../bestSellingProduct/BestSellingProduct";
import MenProduct from "../mensProduct/MenProduct";
import WomenProduct from "../womenProduct/WomenProduct";
import KidProducts from "../kidsProduct/KidProducts";

import SubBanner from "../subBanner/SubBanner";


const Home = () => {
  return (
    <div className="pt-8">
     
      <Banner />
      <SubBanner/>
      <div className="mt-12 mb-12 ">
      <Divider dashed orientation="right"  style={{ borderColor: 'gray', color:'#453433', fontSize:'18px', fontWeight:400 }}>Best Selling Products</Divider>
      </div>
      <BestSellingProduct/>
      <div className="mt-12 mb-12 ">
      <Divider style={{ borderColor: 'gray', color:'red', fontSize:'18px', fontWeight:400 }}>Men's Collection</Divider>
      </div>
      <MenProduct/>
  
    <div className="mt-12 mb-12 ">
      <Divider style={{ borderColor: 'gray', color:'#453433', fontSize:'18px', fontWeight:400 }}>Women's Collection</Divider>
      </div>
 

      <WomenProduct/>
      <div className="mt-12 mb-12">
      <Divider style={{ borderColor: 'gray', color:'red', fontSize:'18px', fontWeight:400 }}>Kid's Collection</Divider>
      </div>
      <KidProducts/>
    

    
    </div>
  );
};

export default Home;
