import { useGetAllProductsByCategoryQuery } from "../../redux/features/product/productApi";
import { Drawer, Rate, Spin } from "antd";
import { Link, useParams } from "react-router-dom";
import NoDataFoundPage from "../noDataFoundPage/NoDataFoundPage";
import Sidebar from "../../components/sidebar/Sidebar";

import { FaFighterJet, FaFilter } from "react-icons/fa";
import { useState } from "react";

const ProductCategory = () => {
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
    <div className="w-full p-20">
       <div className=" flex justify-center items-center">
       <button
          className="  text-red-500 md:hidden hover:text-gray-300 focus:outline-none"
          onClick={() => setDrawerVisible(true)}
        >
          <FaFighterJet/>
        </button>
      <Drawer   title="Menu"
        placement="right"
        closable={true}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}>
      <Sidebar/>
      </Drawer>
       </div>
      <div className="container flex items-center justify-center mx-auto p-10">
     
  
     
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 rounded-lg shadow-sm">
          {productsData?.data?.map((product, index) => (
            <Link to={`/product/${product._id}`}>
              <div
                key={index}
                className="max-w-[300px] h-[350px] border border-gray-200 shadow-lg group rounded-lg"
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={product.image}
                    alt="product-image"
                    className="object-cover w-full h-64 group-hover:transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="bg-gray-300 p-4">
                  <h4 className="text-center font-semibold text-">
                    {product?.name}
                  </h4>
                  <div className="flex justify-between items-center mt-3">
                    <p>৳{product.price}</p>
                    <Rate
                      className="text-yellow-700 text-[14px]"
                      defaultValue={product.rating}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
