/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams } from "react-router-dom";
import { useGetSingleProductForDetailsQuery } from "../../redux/features/product/productApi";
import { Button, Divider, Rate, Select, Spin } from "antd";
import ImageSlide from "./ImageSlide";
import ProductTab from "../../components/tab/ProductTab";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../redux/hooks";
import { addToCart } from "../../redux/features/cart/cartSlice";
import RelatedProducts from "../../components/relatedProducts/RelatedProducts";
import CustomeDivider from "../../components/customeDivider/CustomeDivider";

const ProductDetails = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const { id } = useParams();
  const { data: product, isLoading } = useGetSingleProductForDetailsQuery(id);

  const images = product?.data[0]?.images;
  const avgRating = product?.data[0]?.averageRating;
  const ProductReviewData = product?.data[0];
  const descriptions = product?.data[0]?.description;
  const dispatch = useAppDispatch();
  const productSizeAndStockOptions =
    product?.data[0]?.sizeStok

      ?.filter((item: any) => item.stock > 0)
      ?.map((item: any) => ({
        value: item.size,
        label: `Size ${item.size} (Stock: ${item.stock})`,
      })) || [];
  const handleSelectChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
    setIsSizeSelected(true);
  };

  return (
    <div className="container mx-auto p-20">
      <Spin spinning={isLoading}>
        <div className="md:flex md:justify-center md:items-center md:gap-2 space-x-5 rounded">
          <div className="md:max-w-[40%] bg-white p-0">
            <div className="w-[80%]">
              <ImageSlide images={images} />
            </div>
          </div>

          <div className="md:max-w-[60%] border border-neutral-[1px] rounded-md md:p-5">
            <div className="py-5 flex justify-evenly items-center">
            <h4 className="text-lg text-balance md:text-xl text-center font-semibold text-textprimary capitalize mb-0">
              {product?.data[0]?.name}
             
            </h4>
           <div className="flex justify-center items-center gap-2">
           <Rate
                disabled
                value={avgRating}
                className="text-yellow-400"
              />
              <p>({product?.data[0]?.reviews?.length}) Reviews</p>
           </div>

            </div>
            <Divider className="m-0" />
            <div className="flex justify-between items-center px-10 py-1">
              <p className="text-gray-600 font-semibold text-sm">Price:</p>
              <p className="text-end text-balance text-sm text-gray-500">
                ৳{product?.data[0]?.price}
              </p>
            </div>
            <Divider className="m-0" />
            <div className="flex justify-between items-center px-10 py-1">
              <p className="text-gray-600 font-semibold text-sm">Discount:</p>
              <p className="text-end text-balance text-sm text-gray-500">
                {product?.data[0]?.discount}%
              </p>
            </div>
            <Divider className="m-0" />
            <div className="flex justify-between items-center px-10 py-1">
              <p className="text-gray-600 font-semibold text-sm">Net Price:</p>
              <p className="text-end text-balance text-sm text-gray-500">
                ৳
                {Math.round(
                  product?.data[0]?.price -
                    (product?.data[0]?.price * product?.data[0]?.discount) / 100
                )}
              </p>
            </div>
            <Divider className="m-0" />
            <div className="flex justify-between items-center px-10 py-1">
              <p className="text-gray-600 font-semibold text-sm">Category:</p>
              <p className="text-end text-balance text-sm text-gray-500">
                {product?.data[0]?.category}
              </p>
            </div>
            <Divider className="m-0" />
            <div className="flex justify-between items-center px-10 py-1">
              <p className="text-gray-600 font-semibold text-sm">
                Sub Category:
              </p>
              <p className="text-end text-balance text-sm text-gray-500">
                {product?.data[0]?.subCategory}
              </p>
            </div>
            <Divider className="m-0" />
            <div className="flex justify-between items-center px-10 py-1">
              <p className="text-gray-600 font-semibold text-sm">Tag:</p>
              <p className="text-end text-balance text-sm text-gray-500">
                {product?.data[0]?.tag}
              </p>
            </div>

            <div>
              <p className="text-textprimary font-serif text-[18px]">
                Please Pick Size
              </p>
              <Select
                className="w-full"
                placeholder="Select size"
                options={productSizeAndStockOptions}
                value={selectedOption}
                onChange={handleSelectChange}
              />

              {selectedOption && <div>Selected size: {selectedOption}</div>}
            </div>

            <p className="text-center mt-4 prose text-balance">
            সারাদেশে ২-৫ দিনে হোম-ডেলিভারি। একসাথে যত খুশি পণ্য অর্ডার করুন, ডেলিভারি চার্জ একই থাকবে । প্রয়োজনে কল করুনঃ 
              <span className="font-semibold">01324250470</span>
            </p>

            <div className="mt-6">
              <Button
                disabled={!selectedOption}
                className="bg-primary text-white uppercase tracking-wider font-semibold"
                onClick={() =>
                  dispatch(
                    addToCart({
                      ...product?.data[0],
                      _id: product?.data[0]?._id,
                      size: selectedOption,
                    })
                  )
                }
                block
                icon={<PlusOutlined />}
              >
                ADD TO CART
              </Button>
            </div>
          </div>
        </div>
      </Spin>
      <div className="p-10">
        <ProductTab  description={descriptions} product={ProductReviewData} />
      </div>
      <CustomeDivider title="Related Product's"/>
     <div>
     <RelatedProducts value={product?.data[0]?.category} />
     </div>
    </div>
  );
};

export default ProductDetails;
