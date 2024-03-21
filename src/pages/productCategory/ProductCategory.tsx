/* eslint-disable prefer-const */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllProductsByCategoryQuery } from "../../redux/features/product/productApi";

import { Card, Spin, Badge, Drawer } from "antd";
import { Link, useParams } from "react-router-dom";
import NoDataFoundPage from "../noDataFoundPage/NoDataFoundPage";
import Sidebar from "../../components/sidebar/Sidebar";
import { IoFilterSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import PageNavigation from "../../components/pageNavigation/PageNavigation";
import Meta from "antd/es/card/Meta";

import LoadingBar from "react-top-loading-bar";
import { TProduct } from "../../types/product.type";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSort } from "../../redux/features/sort/sortSlice";
import ButtonPrimary from "../../components/button/ButtonPrimary";
import { PlusOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const ProductCategory = () => {
  const sort = useAppSelector((state) => state.sort);
  const dispatch = useAppDispatch();
  const { category } = useParams();
  const [progress, setProgress] = useState(0);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useGetAllProductsByCategoryQuery(category);
  console.log(setProgress);

  useEffect(() => {
    dispatch(getSort());
  }, [dispatch]);

  if (isLoading || isFetching) {
    return <Spin spinning={isLoading || isFetching} />;
  }

  if (!productsData?.data?.result || productsData.data?.result.length === 0) {
    return <NoDataFoundPage />;
  }

  const value = sort.getValue;

  const unsortedProducts = productsData?.data?.result;

  let sortedProducts: any = [...unsortedProducts];

  if (value === "price") {
    sortedProducts.sort((a: any, b: any) => a.price - b.price);
  } else if (value === "-price") {
    sortedProducts.sort((a: any, b: any) => b.price - a.price);
  } else if (value === "name") {
    sortedProducts.sort((a: any, b: any) => a.name.localeCompare(b.name));
  }

  return (
    <div className="w-full mt-10">
      <LoadingBar progress={progress} />
      <PageNavigation
        title={`products <RightOutlined /> category  <RightOutlined />  ${category}`}
      />

      <div className=" flex justify-center items-center">
        <button
          className="  text-red-500 font-semibold text-xl md:hidden hover:text-gray-300 focus:outline-none"
          onClick={() => setDrawerVisible(true)}
        >
          <IoFilterSharp />
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
      <div className="md:container mx-auto md:px-20 py-10 bg-white">
      <Spin spinning={isLoading}>
        <div className="grid md:grid-col2 lg:grid-cols-3 gap-2">
          {sortedProducts?.map((product: TProduct, index: number) => (
           
              <div key={index}>
                <Badge.Ribbon
                placement="start"
                  text={
                    product.discount !== 0 ? `discount${product.discount}%` : ""
                  }
                  color="#7d3f98"
                >
                  <Card
                    key={product?._id}
                    className=" w-[300px] h-[400px]"
                    cover={
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        whileHover={{ scale: 1.1 }}
                        className=" rounded-t-md h-[200px] cursor-wait border border-neutral-100 shadow-lg overflow-hidden "
                      >
                        <img
                          alt="example"
                          src={product?.images[0]}
                          loading="lazy"
                          className="max-w-full max-h-80% rounded-t-md"
                        />
                      </motion.div>
                    }
                  >
                    <Meta
                      title={
                        <h4 className="text-blace capitalize text-textprimary text-center">
                          {product.name}
                        </h4>
                      }
                    />
                    <div className="flex flex-wrap justify-center items-center mt-2 gap-1">
                      {product?.sizeStok?.map((item) => (
                        <div
                          key={item.size}
                          className={`flex justify-center items-center px-3 py-0.5 border divide-x-4 border-gray-300 ${
                            item?.stock === 0
                              ? "text-textprimary rounded-[4px] font-semibold line-through "
                              : "text-textsecoundary rounded-[4px] font-semibold"
                          }`}
                          style={{ textDecorationThickness: "2px" }}
                        >
                          size/{item.size}
                        </div>
                      ))}
                    </div>

                    <div className="my-5">
                      {product.discount === 0 ? (
                        <p className="text-secondry text-[18px] font-semibold">
                          Price: {product.price}৳
                        </p>
                      ) : (
                        <div className="flex container mx-auto justify-center items-center gap-4 max-w-[100px]">
                          <h5 className="text-textprimary text-[20px] font-semibold line-through">
                            {product?.price}৳
                          </h5>

                          {product?.discount && (
                            <h5 className="text-secondry text-[18px] font-semibold">
                              {product?.price -
                                (product?.price * product?.discount) / 100}
                              ৳
                            </h5>
                          )}
                        </div>
                      )}
                    </div>
                    <Link key={product._id} to={`/product/${product._id}`}>
                      <ButtonPrimary icon={<PlusOutlined />} title={"order"} />
                    </Link>
                  </Card>
                </Badge.Ribbon>
              </div>
          ))}
        </div>
          </Spin>
      </div>
    </div>
  );
};

export default ProductCategory;

