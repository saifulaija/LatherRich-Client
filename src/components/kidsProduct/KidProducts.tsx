import { useState } from "react";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { TQueryParam } from "../../types/global.type";
import { Button, Card, Divider, Rate, Spin } from "antd";
import Meta from "antd/es/card/Meta";

import { FaShapes } from "react-icons/fa";
import { Link } from "react-router-dom";

const BestSellingProduct = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery([{ name: "sort", value: "-price" },{name:'category', value:'kid'}, ...params]);

  const displayedProducts = showAllProducts
    ? productsData?.data
    : productsData?.data?.slice(0, 4);

  const handleViewAll = () => {
    setShowAllProducts(true);
  };

  return (
    <div className="w-full">
      <Spin spinning={isLoading && isFetching}>
        <div className="container flex items-center justify-center mx-auto  ">
          <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-4 rounded-lg shadow-sm">
            {displayedProducts?.map((product) => (
              <Link to={`/product/${product._id}`}>
                <Card
                  hoverable
                  bordered
                  key={product?._id}
                 
                  className="group max-w-full"
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
                    icon={<FaShapes />}
                  >
                    Shop Now
                  </Button>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        {!showAllProducts && (
          <div className="flex justify-center items-center mt-10 mb-10">
            <button className="btn" onClick={handleViewAll}>
              View All
            </button>
          </div>
        )}
      </Spin>
    </div>
  );
};

export default BestSellingProduct;
