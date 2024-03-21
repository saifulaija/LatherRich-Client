// import { useState } from "react";
// import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
// import { TQueryParam } from "../../types/global.type";
// import { Badge, Button, Card, Spin } from "antd";
// import Meta from "antd/es/card/Meta";

// import { Link } from "react-router-dom";
// import {
//   EditOutlined,
//   EllipsisOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";

// const BestSellingProduct = () => {
//   const [params, setParams] = useState<TQueryParam[]>([]);

//   const {
//     data: productsData,
//     isLoading,
//     isFetching,
//   } = useGetAllProductsQuery([{ name: "sort", value: "-price" }, ...params]);

//   return (
//     <div className="w-full">
//       <Spin spinning={isLoading && isFetching}>
//         <div className="container flex items-center justify-center mx-auto  ">
//           <div className="grid  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
//             {productsData?.data?.map((product) => (
//               <Link to={`/product/${product._id}`}>
//                 <Badge.Ribbon
//                   text={
//                     product.discount !== 0 ? `discount${product.discount}%` : ""
//                   }
//                   color="#7d3f98"
//                 >
//                   <Card
//                     style={{ width: 300 }}
//                     cover={<img alt="example" src={product?.images[0]} />}
//                     actions={[
//                       <Button key="setting" ></Button>,
//                       <EditOutlined key="edit" />,
//                       <EllipsisOutlined key="ellipsis" />,
//                     ]}
//                   >
//                     <Meta
//                       title={<div className="font-semibold">{product.name}</div>}
//                       description={
//                         <div className="text-blance line-clamp-2 w-full">
//                           {product.description}
//                         </div>
//                       }
//                     />
//                   </Card>
//                 </Badge.Ribbon>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </Spin>
//     </div>
//   );
// };

// export default BestSellingProduct;

import { useState } from "react";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { TQueryParam } from "../../types/global.type";
import { Badge, Card, Divider, Spin } from "antd";
import Meta from "antd/es/card/Meta";

import { Link } from "react-router-dom";

const BestSellingProduct = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);

  console.log(setParams);

  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery([{ name: "sort", value: "-price" }, ...params]);

  return (
    <div className="w-full">
      <Spin spinning={isLoading && isFetching}>
        <div className="container flex items-center justify-center mx-auto  ">
          <div className="grid  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {productsData?.data?.map((product) =>
              product.discount !== 0 ? (
                <Badge.Ribbon
                  text={`discount${product.discount}%`}
                  color="#7d3f98"
                  key={product?._id}
                >
                  <Link to={`/product/${product._id}`}>
                    <Card
                      key={product?._id}
                      className="group max-w-full max-h-[100%] border bg-white border-neutral-400 "
                      cover={
                        <img
                          alt="example"
                          src={product?.images[0]}
                          className="max-w-[100%] max-h-[80%] group-hover:transition-transform duration-300 group-hover:scale-95 overflow-hidden hover:duration-75 rounded-t-md"
                        />
                      }
                    >
                      <div className="flex flex-wrap justify-center items-center gap-2 ">
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
                      </div>

                      <div className="flex container mx-auto justify-center items-center  gap-4 max-w-[100px] ">
                        <h5 className="text-textprimary text-[20px]  font-semibold line-through">
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
                    </Card>
                  </Link>
                </Badge.Ribbon>
              ) : (
                <Link to={`/product/${product._id}`}>
                  <Card
                    key={product?._id}
                    className="group max-w-full bg-neutral-300"
                    cover={
                      <img
                        alt="example"
                        src={product?.images[0]}
                        className="max-w-[100%] max-h-[80%] group-hover:transition-transform duration-300 group-hover:scale-95 hover:duration-75 rounded-t-md"
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
                  </Card>
                </Link>
              )
            )}
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default BestSellingProduct;

// import { useState } from "react";
// import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
// import { TQueryParam } from "../../types/global.type";
// import { Badge, Card, Divider, Spin } from "antd";
// import Meta from "antd/es/card/Meta";
// import { Link } from "react-router-dom";

// const BestSellingProduct = () => {
//   const [params, setParams] = useState<TQueryParam[]>([]);

//   const { data: productsData, isLoading, isFetching } = useGetAllProductsQuery([
//     { name: "sort", value: "-price" },
//     ...params
//   ]);

//   return (
//     <div className="w-full">
//       <Spin spinning={isLoading && isFetching}>
//         <div className="container flex items-center justify-center mx-auto  ">
//           <div className="grid  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
//             {productsData?.data?.map((product) => (
//               <Link to={`/product/${product._id}`} key={product?._id}>
//                 <Badge.Ribbon
//                   text={product.discount !== 0 ? `discount${product.discount}%` : ""}
//                   color="#7d3f98"
//                 >
//                   <Card
//                     className="group max-w-full max-h-[100%] border bg-white border-neutral-400 "
//                     cover={
//                       <img
//                         alt="example"
//                         src={product?.images[0]}
//                         className="max-w-[100%] max-h-[80%] group-hover:transition-transform duration-300 group-hover:scale-95 overflow-hidden hover:duration-75 rounded-t-md"
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
//                   </Card>
//                 </Badge.Ribbon>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </Spin>
//     </div>
//   );
// };

// export default BestSellingProduct;
