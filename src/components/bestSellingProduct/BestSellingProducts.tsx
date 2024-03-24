import { Card, Spin, Badge } from "antd";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import { useState } from "react";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { TQueryParam } from "../../types/global.type";
import "./NewBestSelling.css";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import ButtonPrimary from "../button/ButtonPrimary";
import { PlusOutlined } from "@ant-design/icons";

const BestSellingProducts = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const { data: productsData, isLoading } = useGetAllProductsQuery([
    { name: "sort", value: "-price" },
    ...params,
  ]);
  console.log(setParams);
  return (
    <div className="md:container mx-auto bg-white">
      <Spin spinning={isLoading}>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={4}
          autoplay={{ delay: 5000 }}
          navigation={true}
          pagination={{ clickable: true, el: ".swiper-pagination" }}
          breakpoints={{
            '@0.00': {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            '@0.75': {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            '@1.00': {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            '@1.50': {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
        >
          {productsData?.data?.map((product, index) => (
            <SwiperSlide key={index}>
              <Badge.Ribbon
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
                  <Link to={`/product/${product._id}`}>
                    <ButtonPrimary icon={<PlusOutlined />} title={"order"} />
                  </Link>
                </Card>
              </Badge.Ribbon>
            </SwiperSlide>
          ))}
        </Swiper>
      </Spin>
    </div>
  );
};

export default BestSellingProducts;
