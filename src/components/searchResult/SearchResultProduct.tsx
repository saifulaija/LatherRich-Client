import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { TQueryParam } from "../../types/global.type";
import { Badge, Card, Spin } from "antd";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { TProduct } from "../../types/product.type";
import ButtonPrimary from "../button/ButtonPrimary";
import { PlusOutlined } from "@ant-design/icons";
import CustomeDivider from "../customeDivider/CustomeDivider";

const { Meta } = Card;

const SearchResultProduct = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("q");
    console.log(searchQuery);

    if (searchQuery) {
      setParams([{ name: "searchTerm", value: searchQuery }]);
    }
  }, [location.search]);

  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery([...params]);

  return (
    <div className="w-full pt-10">
      <CustomeDivider title="Search Products--" />
      <div className="container mx-auto mt-5 flex items-center justify-center ">
        <Spin spinning={isLoading && isFetching}>
          <div className="grid md:grid-col2 lg:grid-cols-3 gap-8">
            {productsData?.data?.map((product: TProduct, index: number) => (
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
                        className="rounded-t-md cursor-pointer border border-neutral-100 shadow-lg overflow-hidden"
                        style={{ width: "300px", height: "200px" }}
                      >
                        <img
                          alt="example"
                          src={product?.images[0]}
                          loading="lazy"
                          className="w-full h-full object-cover rounded-t-md"
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

export default SearchResultProduct;
