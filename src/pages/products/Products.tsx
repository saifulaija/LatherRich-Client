import { useState } from "react";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { TQueryParam } from "../../types/global.type";




const Products = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
 
 const {data:products}=useGetAllProductsQuery([
   
    { name: "sort", value: "-price" },
    ...params,
  ])
    console.log(products)
    return (
        <div>
        <p>products: {products?.data?.length}</p>
        </div>
    );
};

export default Products;