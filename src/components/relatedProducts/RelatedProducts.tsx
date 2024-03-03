/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
// import { TQueryParam } from "../../types/global.type";
// import { Button, Card, Divider, Rate, Spin } from "antd";
// import Meta from "antd/es/card/Meta";

// import { FaShapes } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const RelatedProducts = ({ value }) => {
//   const [params, setParams] = useState<TQueryParam[]>([]);

//   const {
//     data: productsData,
//     isLoading,
//     isFetching,
//   } = useGetAllProductsQuery([
//     { name: "sort", value: "-price" },
//     { name: "category", value: value },
//     ...params,
//   ]);

//   return (
//     <div className="w-full">
//       <Spin spinning={isLoading && isFetching} >
//         <div className="container flex items-center justify-center mx-auto  ">
//           <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-4 rounded-lg shadow-sm">
//             {productsData?.data?.map((product) => (
//               <Link to={`/product/${product._id}`}>
//                 <Card
//                   bordered
//                   key={product?._id}
//                   className="group max-w-full  border border-gray-200
//                   "
//                   cover={
//                     <img
//                       alt="example"
//                       src={product?.images[0]}
//                       className="w-full group-transition duration-300 transform group-hover:scale-75 rounded-t-md"
//                     />
//                   }
//                 >
//                   <Meta title={product?.name} className="text-center" />
//                   <Divider />
//                   <div className="flex justify-between items-center mb-4">
//                     <h5 className=" text-yellow-900 font-semibold">
//                       Price: ৳{product?.price}
//                     </h5>
//                     <Rate className="text-[14px]" value={product?.rating} />
//                   </div>

//                   <div className="flex justify-center items-center gap-2 mb-4">
//                     {product?.sizeStok?.map((item) => (
//                       <div
//                         key={item.size}
//                         className={`flex justify-center items-center w-8 h-8 rounded-full border-2 border-gray-300 ${
//                           item?.stock === 0
//                             ? "text-red-500 line-through"
//                             : "text-gray-900"
//                         }`}
//                         style={{ textDecorationThickness: "2px" }}
//                       >
//                         {item.size}
//                       </div>
//                     ))}
//                   </div>
//                   <Button
//                     className="mt-auto absolute bottom-0 left-0 right-0 text-white bg-[#453433]"
//                     block
//                     icon={<FaShapes />}
//                   >
//                     Shop Now
//                   </Button>
//                 </Card>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </Spin>
//     </div>
//   );
// };

// export default RelatedProducts;



import { useState } from "react";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { TQueryParam } from "../../types/global.type";
import { Button, Card, Divider, Rate, Spin } from "antd";
import Meta from "antd/es/card/Meta";

import { FaShapes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './RelatedProduct.css'

import Slider from "react-slick";
import PropTypes from 'prop-types';
interface RelatedProductsProps {
  value: any; // Replace 'any' with the appropriate type
}

const  RelatedProducts: React.FC<RelatedProductsProps> = ({ value }) => {
  const [params, setParams] = useState<TQueryParam[]>([]);

  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery([
    { name: "sort", value: "-price" },
    { name: "category", value: value },
    ...params,
  ]);


  function SampleNextArrow(props:any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props:any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  const  settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="w-full max-w-[80%] m-auto ">
      <Spin spinning={isLoading && isFetching} >
     <div>
     <Slider {...settings}>
        
        
        {productsData?.data?.map((product) => (
          <Link to={`/product/${product._id}`}>
            <Card
              bordered
              key={product?._id}
              className="group max-w-full  border border-gray-200
              "
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
     
  
  </Slider>
     </div>
      </Spin>
    </div>
  );
};

RelatedProducts.prototype={
  props:PropTypes.any,
  value:PropTypes.any
}
export default RelatedProducts;
