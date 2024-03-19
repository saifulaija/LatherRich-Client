/* eslint-disable prefer-const */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllProductsByCategoryQuery } from "../../redux/features/product/productApi";
import { Button, Card, Divider, Drawer, Rate, Spin } from "antd";
import { Link, useParams } from "react-router-dom";
import NoDataFoundPage from "../noDataFoundPage/NoDataFoundPage";
import Sidebar from "../../components/sidebar/Sidebar";
import { IoFilterSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import PageNavigation from "../../components/pageNavigation/PageNavigation";
import Meta from "antd/es/card/Meta";
import { FaShop } from "react-icons/fa6";

import LoadingBar from "react-top-loading-bar";
import { TProduct } from "../../types/product.type";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSort } from "../../redux/features/sort/sortSlice";

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
  console.log(setProgress)

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
      <div className="container flex items-center justify-center mx-auto p-10">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 rounded-lg shadow-sm">
          {sortedProducts.map((product: TProduct) => (
            <Link key={product._id} to={`/product/${product._id}`}>
              <Card
                bordered
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
