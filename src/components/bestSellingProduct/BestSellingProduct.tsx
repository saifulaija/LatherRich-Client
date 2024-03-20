import { useState } from "react";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { TQueryParam } from "../../types/global.type";
import { Button, Badge, Card, Divider, Spin } from "antd";
import Meta from "antd/es/card/Meta";

import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BestSellingProduct = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [showAllProducts, setShowAllProducts] = useState(false);
  console.log(setParams);

  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery([{ name: "sort", value: "-price" }, ...params]);

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
          <div className="grid  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {displayedProducts?.map((product) =>
              product.discount !== 0 ? (
                <Badge.Ribbon
                  text={`discount${product.discount}%`}
                  color="#7d3f98"
                  key={product?._id}
                >
                  <Link to={`/product/${product._id}`}>
                    <Card
                      key={product?._id}
                      className="group max-w-full border max-h-auto bg-texthexa border-neutral-100 "
                      cover={
                        <img
                          alt="example"
                          src={product?.images[0]}
                          className="max-w-[310px] h-[100px} group-hover:transition-transform duration-300 group-hover:scale-95 overflow-hidden hover:duration-75 rounded-t-md"
                        />
                      }
                    >
                      {/* <Divider className="border-gray-300 my-2" /> */}
                      {/* <div className="flex flex-wrap justify-center items-center gap-2 mb-2">
                        {product?.sizeStok?.map((item) => (
                          <div
                            key={item.size}
                            className={`flex justify-center  items-center px-3 py-0.5 border divide-x-4  border-gray-300 ${
                              item?.stock === 0
                                ? "text-textprimary rounded-[4px] font-semibold line-through "
                                : "text-textsecoundary rounded-[4px] font-semibold"
                            }`}
                            style={{ textDecorationThickness: "2px" }}
                          >
                            size/{item.size}
                          </div>
                        ))}
                      </div> */}
<p className="text-balance text-center capitalize font-semibold text-textwhite">{product?.name}</p>
                      <div className="flex container mx-auto justify-center items-center mt-0 gap-4 max-w-[100px] ">
                        <h5 className="text-white text-[20px]  font-semibold line-through">
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
                      <div className="flex justify-center items-center gap-2">
                        <div>
                          <p  className="line-clamp-2 text-textwhite text-balance">
                            {product?.description}
                          </p>
                        </div>
                        <div>
                          <Button className="text-textwhite">Buy Now</Button>
                        </div>
                      </div>

                      {/* <Button
                        className="mt-auto absolute bottom-0  left-0 right-0  border  text-textprimary uppercase tracking-wider font-semibold"
                        block
                        // icon={<CiShoppingCart className="text-[15px]" />}
                      >
                        Shop Now
                      </Button> */}
                    </Card>
                  </Link>
                </Badge.Ribbon>
              ) : (
                <Link to={`/product/${product._id}`}>
                  <Card
                    key={product?._id}
                    className="group max-w-full bg-texthexa"
                    cover={
                      <img
                        alt="example"
                        src={product?.images[0]}
                        className="max-w-[300px] h-[200px] group-hover:transition-transform duration-300 group-hover:scale-95 hover:duration-75 rounded-t-md"
                      />
                    }
                  >
                    <Meta
                      title={
                        <div className="text-gray-500 capitalize font-semibold  mb-0">
                          {product?.name}
                        </div>
                      }
                      className="text-center font-semibold  text-gray-400"
                      description={
                        <div className="line-clamp-2 text-balance">
                          {product.description}
                        </div>
                      }
                    />
                    <Divider className="border-gray-300 my-2" />
                    <div className="flex flex-wrap justify-center items-center gap-2 mb-2">
                      {product?.sizeStok?.map((item) => (
                        <div
                          key={item.size}
                          className={`flex justify-center  items-center px-3 py-0.5 border divide-x-4  border-gray-300 ${
                            item?.stock === 0
                              ? "text-gray-500 rounded-[4px] font-semibold line-through "
                              : "text-gray-400 rounded-[4px] font-semibold"
                          }`}
                          style={{ textDecorationThickness: "2px" }}
                        >
                          size/{item.size}
                        </div>
                      ))}
                    </div>

                    <div className="flex container mx-auto justify-center items-center mb-2 gap-4 max-w-[100px] ">
                      <h5 className="text-[#8e244d] text-[18px] font-semibold">
                        Price:{product?.price}৳
                      </h5>
                    </div>

                    <Button
                      className="mt-auto absolute bottom-0 left-0 right-0   text-gray-500 capitalize tracking-wider font-semibold"
                      block
                      icon={
                        <CiShoppingCart className="text-[15px] text-primary" />
                      }
                    >
                      Shop Now
                    </Button>
                  </Card>
                </Link>
              )
            )}
          </div>
        </div>
        {!showAllProducts && (
          <div className="flex justify-center items-center mt-10">
            <Button
              block
              className="max-w-[120px] border text-gray-500 border-teal-600 font-semibold uppercase tracking-wider"
              onClick={handleViewAll}
            >
              View All
            </Button>
          </div>
        )}
      </Spin>
    </div>
  );
};

export default BestSellingProduct;

// import { useState } from "react";
// import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
// import { TQueryParam } from "../../types/global.type";
// import { Button, Badge, Card, Divider, Spin } from "antd";
// import Meta from "antd/es/card/Meta";

// import { Link } from "react-router-dom";
// import { CiShoppingCart } from "react-icons/ci";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const BestSellingProduct = () => {
//   const [params, setParams] = useState<TQueryParam[]>([]);
//   const [showAllProducts, setShowAllProducts] = useState(false);
//   console.log(setParams);

//   const {
//     data: productsData,
//     isLoading,
//     isFetching,
//   } = useGetAllProductsQuery([{ name: "sort", value: "-price" }, ...params]);

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
//           <div className="grid  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
//             {displayedProducts?.map((product) =>
//               product.discount !== 0 ? (
//                 <Badge.Ribbon
//                   text={`discount${product.discount}%`}
//                   color="#7d3f98"
//                   key={product?._id}
//                 >
//                   <Link to={`/product/${product._id}`}>
//                     <Card
//                       key={product?._id}
//                       className="group max-w-full border bg-textprimary border-neutral-100 "
//                       cover={
//                         <img
//                           alt="example"
//                           src={product?.images[0]}
//                           className="max-w-[320px] h-[100px} group-hover:transition-transform duration-300 group-hover:scale-95 overflow-hidden hover:duration-75 rounded-t-md"
//                         />
//                       }
//                     >
//                       <Meta
//                         title={
//                           <div className="text-textprimary capitalize font-semibold  mb-0">
//                             {product?.name}
//                           </div>
//                         }
//                         className="text-center font-semibold  text-textsecoundary"
//                         description={
//                           <div className="line-clamp-2 text-balance">
//                             {product.description}
//                           </div>
//                         }
//                       />
//                       <Divider className="border-gray-300 my-2" />
//                       <div className="flex flex-wrap justify-center items-center gap-2 mb-2">
//                         {product?.sizeStok?.map((item) => (
//                           <div
//                             key={item.size}
//                             className={`flex justify-center  items-center px-3 py-0.5 border divide-x-4  border-gray-300 ${
//                               item?.stock === 0
//                                 ? "text-textprimary rounded-[4px] font-semibold line-through "
//                                 : "text-textsecoundary rounded-[4px] font-semibold"
//                             }`}
//                             style={{ textDecorationThickness: "2px" }}
//                           >
//                             size/{item.size}
//                           </div>
//                         ))}
//                       </div>

//                       <div className="flex container mx-auto justify-center items-center mb-2 gap-4 max-w-[100px] ">
//                         <h5 className="text-textprimary text-[20px]  font-semibold line-through">
//                           {product?.price}৳
//                         </h5>

//                         {product?.discount && (
//                           <h5 className="text-secondry text-[18px] font-semibold">
//                             {product?.price -
//                               (product?.price * product?.discount) / 100}
//                             ৳
//                           </h5>
//                         )}
//                       </div>

//                       <Button
//                         className="mt-auto absolute bottom-0  left-0 right-0  border  text-textprimary uppercase tracking-wider font-semibold"
//                         block
//                         // icon={<CiShoppingCart className="text-[15px]" />}
//                       >
//                         Shop Now
//                       </Button>
//                     </Card>
//                   </Link>
//                 </Badge.Ribbon>
//               ) : (
//                 <Link to={`/product/${product._id}`}>
//                   <Card
//                     key={product?._id}
//                     className="group max-w-full bg-neutral-50"
//                     cover={
//                       <img
//                         alt="example"
//                         src={product?.images[0]}
//                         className="max-w-[300px] h-[200px] group-hover:transition-transform duration-300 group-hover:scale-95 hover:duration-75 rounded-t-md"
//                       />
//                     }
//                   >
//                     <Meta
//                       title={
//                         <div className="text-gray-500 capitalize font-semibold  mb-0">
//                           {product?.name}
//                         </div>
//                       }
//                       className="text-center font-semibold  text-gray-400"
//                       description={
//                         <div className="line-clamp-2 text-balance">
//                           {product.description}
//                         </div>
//                       }
//                     />
//                     <Divider className="border-gray-300 my-2" />
//                     <div className="flex flex-wrap justify-center items-center gap-2 mb-2">
//                       {product?.sizeStok?.map((item) => (
//                         <div
//                           key={item.size}
//                           className={`flex justify-center  items-center px-3 py-0.5 border divide-x-4  border-gray-300 ${
//                             item?.stock === 0
//                               ? "text-gray-500 rounded-[4px] font-semibold line-through "
//                               : "text-gray-400 rounded-[4px] font-semibold"
//                           }`}
//                           style={{ textDecorationThickness: "2px" }}
//                         >
//                           size/{item.size}
//                         </div>
//                       ))}
//                     </div>

//                     <div className="flex container mx-auto justify-center items-center mb-2 gap-4 max-w-[100px] ">
//                       <h5 className="text-[#8e244d] text-[18px] font-semibold">
//                         Price:{product?.price}৳
//                       </h5>
//                     </div>

//                     <Button
//                       className="mt-auto absolute bottom-0 left-0 right-0   text-gray-500 capitalize tracking-wider font-semibold"
//                       block
//                       icon={
//                         <CiShoppingCart className="text-[15px] text-primary" />
//                       }
//                     >
//                       Shop Now
//                     </Button>
//                   </Card>
//                 </Link>
//               )
//             )}
//           </div>
//         </div>
//         {!showAllProducts && (
//           <div className="flex justify-center items-center mt-10">
//             <Button
//               block
//               className="max-w-[120px] border text-gray-500 border-teal-600 font-semibold uppercase tracking-wider"
//               onClick={handleViewAll}
//             >
//               View All
//             </Button>
//           </div>
//         )}
//       </Spin>
//     </div>
//   );
// };

// export default BestSellingProduct;
