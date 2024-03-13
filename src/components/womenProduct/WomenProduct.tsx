// import { useState } from "react";
// import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
// import { TQueryParam } from "../../types/global.type";
// import { Badge, Button, Card, Divider,  Spin } from "antd";
// import Meta from "antd/es/card/Meta";

// import { Link } from "react-router-dom";
// import { CiShoppingCart } from "react-icons/ci";

// const BestSellingProduct = () => {
//   const [params, setParams] = useState<TQueryParam[]>([]);
//   const [showAllProducts, setShowAllProducts] = useState(false);
//   console.log(setParams)

//   const {
//     data: productsData,
//     isLoading,
//     isFetching,
//   } = useGetAllProductsQuery([
//     { name: "sort", value: "-price" },
//     { name: "category", value: "women" },
//     ...params,
//   ]);

//   const displayedProducts = showAllProducts
//     ? productsData?.data
//     : productsData?.data?.slice(0, 4);

//   const handleViewAll = () => {
//     setShowAllProducts(true);
//   };

//   return (
//     <div className="w-full">
//       <Spin spinning={isLoading && isFetching}>
//         <div className="container flex items-center justify-center mx-auto  ">
//           <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-4 rounded-lg shadow-sm">
//             {displayedProducts?.map((product) => (
//               <Badge.Ribbon text={`${product.discount}%`} color="magenta">
//                 <Link to={`/product/${product._id}`}>
//                   <Card
//                     key={product?._id}
//                     className="group max-w-full border border-gray-200"
//                     cover={
//                       <img
//                       key={product._id}
//                         alt="example"
//                         src={product?.images[0]}
//                         className="w-full group-transition duration-300 transform group-hover:scale-75 rounded-t-md"
//                       />
//                     }
//                   >
//                     <Meta title={product?.name} className="text-center" />
//                     <Divider />
//                     <div className="flex justify-between items-center mb-4">
//                       <h5 className=" text-gray-500 font-semibold line-through">
//                         Price: ৳{product?.price}
//                       </h5>
//                       {product?.discount && (
//                   <h5 className="text-gray-500 font-semibold">
//                     Price: ৳{product?.price - (product?.price * product?.discount) / 100} {/* Applying discount */}
//                   </h5>
//                 )}
//                     </div>

//                     <div className="flex justify-center items-center gap-2 mb-4">
//                       {product?.sizeStok?.map((item) => (
//                         <div
//                           key={item.size}
//                           className={`flex justify-center items-center w-8 h-8 rounded-full border-2 border-gray-300 ${
//                             item?.stock === 0
//                               ? "text-red-500 line-through"
//                               : "text-gray-900"
//                           }`}
//                           style={{ textDecorationThickness: "2px" }}
//                         >
//                           {item.size}
//                         </div>
//                       ))}
//                     </div>
//                     <Button
//                       className="mt-auto absolute bottom-0 left-0 right-0 text-gray-600 font-medium "
//                       block
//                       icon={<CiShoppingCart className="text-[15px]" />}
//                     >
//                       Shop Now
//                     </Button>
//                   </Card>
//                 </Link>
//               </Badge.Ribbon>
//             ))}
//           </div>
//         </div>
//         {!showAllProducts && (
//           <div className="flex justify-center items-center mt-10">
//             <button className="btn" onClick={handleViewAll}>
//               View All
//             </button>
//           </div>
//         )}
//       </Spin>
//     </div>
//   );
// };

// export default BestSellingProduct;
import { useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { TQueryParam } from "../../types/global.type";
import { Badge, Button, Card, Divider, Spin } from "antd";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { motion } from "framer-motion";

const { Meta } = Card;

const BestSellingProduct = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [showAllProducts, setShowAllProducts] = useState(false);
  console.log(setParams)

  const { data: productsData, isLoading, isFetching } = useGetAllProductsQuery([
    { name: "sort", value: "-price" },
    { name: "category", value: "women" },
    ...params,
  ]);

  const displayedProducts = showAllProducts
    ? productsData?.data
    : productsData?.data?.slice(0, 4);

  const handleViewAll = () => {
    setShowAllProducts(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        document.body.classList.add("scrolled");
      } else {
        document.body.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full">
      <Spin spinning={isLoading && isFetching}>
        <div className="container flex items-center justify-center mx-auto">
          <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-4 rounded-lg shadow-sm">
            {displayedProducts?.map((product) => (
              <Badge.Ribbon text={`${product.discount}%`} color="magenta" key={product?._id}>
                <Link to={`/product/${product._id}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card
                      className="group max-w-full border border-gray-200"
                      cover={
                        <img
                          alt="example"
                          src={product?.images[0]}
                         
                        />
                      }
                    >
                      <Meta title={product?.name} className="text-center" />
                      <Divider />
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="text-gray-500 font-semibold line-through">
                          Price: ৳{product?.price}
                        </h5>
                        {product?.discount && (
                          <h5 className="text-gray-500 font-semibold">
                            Price: ৳{product?.price - (product?.price * product?.discount) / 100}
                          </h5>
                        )}
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
                        className="mt-auto absolute bottom-0 left-0 right-0 text-gray-600 font-medium"
                        block
                        icon={<CiShoppingCart className="text-[15px]" />}
                      >
                        Shop Now
                      </Button>
                    </Card>
                  </motion.div>
                </Link>
              </Badge.Ribbon>
            ))}
          </div>
        </div>
        {!showAllProducts && (
          <div className="flex justify-center items-center mt-10">
            <Button className="btn" onClick={handleViewAll}>
              View All
            </Button>
          </div>
        )}
      </Spin>
    </div>
  );
};

export default BestSellingProduct;
