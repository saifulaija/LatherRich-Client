
// import { useGetAllProductsByCategoryQuery } from "../../redux/features/product/productApi";

// import { Rate, Spin } from "antd";
// import { useParams } from "react-router-dom";


// const WomenProduct = () => {
//   const {category}=useParams()
// const {data:productsData, isLoading, isFetching}=useGetAllProductsByCategoryQuery(category)
//  console.log('category',category)
//   console.log(productsData?.data);
//   return (
//     <div className="w-full">
//     <Spin spinning={isLoading || isFetching}>
//     <div className="container flex items-center justify-center mx-auto  ">
//         <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 rounded-lg shadow-sm">
//           {productsData?.data?.map((product, index) => (
//             <div
//               key={index}
//               className="max-w-[350px] border border-gray-200 shadow-lg  group rounded-lg"
//             >
//               <div className="relative overflow-hidden group">
//                 <img
//                   src={product.image}
//                   alt="product-image"
//                   className="object-cover w-full h-64 group-hover:transform group-hover:scale-105 transition-transform duration-300"
//                 />
//               </div>
//               <div className="bg-gray-300 p-4">

//               <h4 className="text-center font-semibold text-">
//                 {product?.name}
//               </h4>
             
//               <div className="flex justify-between items-center mt-3">
//                 <p>৳{product.price}</p>
//                 <Rate  className="text-yellow-700 text-[14px]"  defaultValue={product.rating} />
//               </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
     
     
//     </Spin>
//     </div>
//   );
// };

// export default WomenProduct;



import { useGetAllProductsByCategoryQuery } from "../../redux/features/product/productApi";
import { Rate, Spin } from "antd";
import { useParams } from "react-router-dom";
import NoDataFoundPage from "../noDataFoundPage/NoDataFoundPage";


const ProductCategory = () => {
  const { category } = useParams();
  const { data: productsData, isLoading, isFetching } = useGetAllProductsByCategoryQuery(category);

  if (isLoading || isFetching) {
    return <Spin spinning={isLoading || isFetching} />;
  }

  if (!productsData?.data || productsData.data.length === 0) {
    return <NoDataFoundPage />;
  }

  return (
    <div className="w-full">
      <div className="container flex items-center justify-center mx-auto p-10">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 rounded-lg shadow-sm">
          {productsData?.data?.map((product, index) => (
            <div
              key={index}
              className="max-w-[300px] h-[350px] border border-gray-200 shadow-lg group rounded-lg"
            >
              <div className="relative overflow-hidden group">
                <img
                  src={product.image}
                  alt="product-image"
                  className="object-cover w-full h-64 group-hover:transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="bg-gray-300 p-4">
                <h4 className="text-center font-semibold text-">{product?.name}</h4>
                <div className="flex justify-between items-center mt-3">
                  <p>৳{product.price}</p>
                  <Rate className="text-yellow-700 text-[14px]" defaultValue={product.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;

