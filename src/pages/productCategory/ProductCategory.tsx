import { useGetAllProductsByCategoryQuery } from "../../redux/features/product/productApi";
import { Button, Card, Divider, Drawer, Rate, Spin } from "antd";
import { Link, useParams } from "react-router-dom";
import NoDataFoundPage from "../noDataFoundPage/NoDataFoundPage";
import Sidebar from "../../components/sidebar/Sidebar";

import { FaFighterJet,  } from "react-icons/fa";
import { useState } from "react";
import PageNavigation from "../../components/pageNavigation/PageNavigation";
import Meta from "antd/es/card/Meta";
import { FaShop } from "react-icons/fa6";
import { useTopBarLoader } from "../../utils/topBarLoader";
import LoadingBar from "react-top-loading-bar";


const ProductCategory = () => {

  const [progress, setProgress] = useState(0);
  useTopBarLoader(setProgress);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { category } = useParams();
  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useGetAllProductsByCategoryQuery(category);

  if (isLoading || isFetching) {
    return <Spin spinning={isLoading || isFetching} />;
  }

  if (!productsData?.data || productsData.data.length === 0) {
    return <NoDataFoundPage />;
  }

  return (
    <div className="w-full mt-10">
      <LoadingBar progress={progress} />
       <PageNavigation title={`products <RightOutlined /> category  <RightOutlined />  ${category}`} />

      <div className=" flex justify-center items-center">
        <button
          className="  text-red-500 md:hidden hover:text-gray-300 focus:outline-none"
          onClick={() => setDrawerVisible(true)}
        >
          <FaFighterJet />
        </button>
        <Drawer
          title="Menu"
          placement="right"
          closable={true}
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
        >
          <Sidebar />
        </Drawer>
      </div>
      <div className="container flex items-center justify-center mx-auto p-10">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 rounded-lg shadow-sm">
          {productsData?.data?.map((product, index) => (
             <Link to={`/product/${product._id}`}>
             <Card
               
               bordered
               key={product?._id}
              
               className="group max-w-full border border-gray-200"
               cover={
                 <img
                   alt="example"
                   src={product?.images[0]}
                   className="w-full group-transition duration-300 transform group-hover:scale-75 rounded-t-md"
                 />
               }
             >
               <Meta title={product?.name} className="text-center" />
               <Divider />
               <div className="flex justify-between items-center mb-4">
                 <h5 className=" text-yellow-900 font-semibold">
                   Price: ৳{product?.price}
                 </h5>
                 <Rate className="text-[14px]" value={product?.rating} />
               </div>

               <div className="flex justify-center items-center gap-2 mb-4">
                 {product?.sizeStok?.map((item) => (
                   <div
                     key={item.size}
                     className={`flex justify-center items-center w-8 h-8 rounded-full border-2 border-gray-300 ${
                       item?.stock === 0
                         ? "text-red-500 line-through"
                         : "text-gray-900"
                     }`}
                     style={{ textDecorationThickness: "2px" }}
                   >
                     {item.size}
                   </div>
                 ))}
               </div>
               <Button
                 className="mt-auto absolute bottom-0 left-0 right-0 text-white bg-[#453433]"
                 block
                 icon={<FaShop />}
               >
                 Shop Now
               </Button>
             </Card>
           </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
