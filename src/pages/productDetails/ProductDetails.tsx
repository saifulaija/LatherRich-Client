// import { useParams } from "react-router-dom";
// import { useGetSingleProductForDetailsQuery } from "../../redux/features/product/productApi";
// import { Image, Spin } from "antd";

// const ProductDetails = () => {

//     const  {id}=useParams()
//     const {data:product,isLoading}=useGetSingleProductForDetailsQuery(id)

//     console.log(product)
//     return (
//         <div className="container flex items-center justify-center p-12">

//        <Spin spinning={isLoading}>
//        <div className="md:flex justify-between items-center gap-4">
//          <div>
//          <Image width="100%" src={product?.data?.image} />
//           </div>

//           <div className="border border-gray-300 p-4 flex-grow">
//             <h4 className="text-balance font-bold text-4xl">{product?.data?.name}</h4>
//             <p className="font-semibold text-orange-700 text-4xl"> Price:৳{product?.data?.price}</p>
//             <div>
//                 <p>Selected Size: {product?.data?.sizeStok[0]?.size}</p>
//             <div className="flex justify-start items-center gap-4">
//                {
//                 product?.data?.sizeStok?.map((item)=>(
//                     <div >
//                         <button disabled={item?.stok=== 0} className="border-none px-4 py-1 bg-gray-200 "> size/{item?.size}</button>
//                         <p>{} in stok</p>
//                     </div>
//                 ))
//                }
//             </div>
//             <div>
//                 <button>ADD TO CART Now</button>
//             </div>
//             </div>
//           </div>
//          </div>
//        </Spin>

//         </div>
//     );
// };

// export default ProductDetails;
import { useParams } from "react-router-dom";
import { useGetSingleProductForDetailsQuery } from "../../redux/features/product/productApi";
import { Image, Spin } from "antd";
import { useState, useEffect } from "react";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetSingleProductForDetailsQuery(id);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedStok, setSelectedStok] = useState("");

  useEffect(() => {
    setSelectedSizeIndex(0);
    setSelectedSize(product?.data?.sizeStok[0]?.size || "");
    setSelectedStok(product?.data?.sizeStok[0]?.stok || "");
  }, [product]);

  const handleSizeSelect = (index) => {
    setSelectedSizeIndex(index);
    setSelectedSize(product?.data?.sizeStok[index]?.size || "");
    setSelectedStok(product?.data?.sizeStok[index]?.stock || "");
  };

  const getStokIcon = () => {
    if (selectedStok > 0) {
      return <CheckCircleOutlined style={{ color: "green" }} />;
    } else {
      return <ExclamationCircleOutlined style={{ color: "red" }} />;
    }
  };

  return (
    <div className="container px-6 py-12">
      <Spin spinning={isLoading}>
        <div className="md:flex md:justify-between md:items-center md:gap-8">
          <div className="md:w-1/2">
            <Image width="100%" src={product?.data?.image} />
          </div>

          <div className="md:w-1/2 md:border md:border-gray-300 md:p-6">
            <h2 className="text-3xl font-semibold mb-4">
              {product?.data?.name}
            </h2>
            <p className="text-xl text-orange-700 mb-4">
              Price: ৳{product?.data?.price}
            </p>

            <div className="mb-4">
              <p className="text-lg font-semibold">
                Selected Size: {selectedSize}
              </p>
              <div className="flex gap-4">
                {product?.data?.sizeStok?.map((item, index) => (
                  <button
                    key={index}
                   
                    className={`border px-4 py-2 rounded ${
                      selectedSizeIndex === index
                        ? "bg-gray-600 text-white"
                        : "bg-gray-200"
                    } ${
                      item?.stock === 0 ? "line-through color-red" : ""
                    }`} // Conditionally add line-through class
                    onClick={() => handleSizeSelect(index)}
                  >
                    {item?.size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-lg font-semibold">
                Stock: {selectedStok} {getStokIcon()}
              </p>
            </div>

            <div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default ProductDetails;
