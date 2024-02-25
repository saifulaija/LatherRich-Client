import { useState } from "react";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { TQueryParam } from "../../types/global.type";
import { Divider, Rate } from "antd";

const BestSellingProduct = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery([
    { name: "sort", value: "-price" },
   
    ...params,
  ]);

  const displayedProducts = showAllProducts
  ? productsData?.data
  : productsData?.data?.slice(0, 3);

const handleViewAll = () => {
  setShowAllProducts(true);
};
  console.log(productsData?.data);
  return (
    <div className="w-full">
      <div className="container flex items-center justify-center mx-auto  ">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 rounded-lg shadow-sm">
          {displayedProducts?.map((product, index) => (
            <div
              key={index}
              className="max-w-[350px] border border-gray-200  group rounded-lg  shadow-lg"
            >
              <div className="relative overflow-hidden group">
                <img
                  src={product.image}
                  alt="product-image"
                  className="object-cover w-full h-64 group-hover:transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="bg-gray-300  p-4">

              <h4 className="text-center font-semibold text-">
                {product?.name}
              </h4>
             
              <div className="flex justify-between items-center mt-3">
                <p>৳{product.price}</p>
                <Rate  className="text-yellow-700 text-[14px]"  defaultValue={product.rating} />
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {!showAllProducts && (
        <div className="flex justify-center items-center mt-10">
          <button className="btn" onClick={handleViewAll}>View All</button>
        </div>
      )}
    </div>
  );
};

export default BestSellingProduct;
