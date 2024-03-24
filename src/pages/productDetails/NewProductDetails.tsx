/* eslint-disable @typescript-eslint/no-explicit-any */




import { useState } from "react";
import { Button, Divider, Select, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import {
  addToCart,
} from "../../redux/features/cart/cartSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useGetSingleProductForDetailsQuery } from "../../redux/features/product/productApi";
import PageNavigation from "../../components/pageNavigation/PageNavigation";
import RelatedProducts from "../../components/relatedProducts/RelatedProducts";
import { useTopBarLoader } from "../../utils/topBarLoader";
import LoadingBar from "react-top-loading-bar";
import ImageSlide from "./ImageSlide";
import CustomeDivider from "../../components/customeDivider/CustomeDivider";
import ProductTab from "../../components/tab/ProductTab";

const NewProductDetails = () => {
  const [progress, setProgress] = useState(0);
  useTopBarLoader(setProgress);

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { data: product, isLoading } = useGetSingleProductForDetailsQuery(id);
  const productSizeAndStockOptions = product?.data?.sizeStok
    ?.filter((item :any) => item.stock > 0)
    ?.map((item :any) => ({
      value: item.size,
      label: `Size ${item.size} (Stock: ${item.stock})`,
    })) || [];

  const [selectedOption, setSelectedOption] = useState(null);
  const [isSizeSelected, setIsSizeSelected] = useState(false);

  const handleSelectChange = (selectedOption:any) => {
    setSelectedOption(selectedOption);
    setIsSizeSelected(true);
  };

//   useEffect(() => {
  
//   }, [selectedOption]);

  const images = product?.data?.images;
  const ProductReviewData = product?.data;
  const descriptions = product?.data?.description;

  return (
    <div className="container py-14 md:py-12 rounded-lg">
      <LoadingBar progress={progress} />
      <PageNavigation
        title={`products <RightOutlined /> ${product?.data?.subCategory} <RightOutlined />  ${product?.data?.name}`}
      />

      <Spin spinning={isLoading}>
        <div className="md:flex md:justify-center md:items-center md:gap-2 space-x-5 rounded">
          <div className="md:max-w-[40%] bg-white p-0">
            <div className="w-[80%]">
              <ImageSlide images={images} />
            </div>
            <div>
              <ProductTab
                description={descriptions}
                product={ProductReviewData}
              />
            </div>
          </div>

          <div className="md:max-w-[60%] border border-gray-200 rounded-md md:p-1">
            <h4 className="text-2xl text-center font-semibold text-primary capitalize mb-0">
              {product?.data?.name}
            </h4>
            <Divider className="m-0" />
            <div className="flex justify-between items-center px-10 py-1">
              <p className="text-gray-600 font-semibold text-sm">Price:</p>
              <p className="text-end text-balance text-sm text-gray-500">
                ৳{product?.data?.price}
              </p>
            </div>
            <Divider className="m-0" />
            <div className="flex justify-between items-center px-10 py-1">
              <p className="text-gray-600 font-semibold text-sm">Discount:</p>
              <p className="text-end text-balance text-sm text-gray-500">
                {product?.data?.discount}%
              </p>
            </div>
            <Divider className="m-0" />
            <div className="flex justify-between items-center px-10 py-1">
              <p className="text-gray-600 font-semibold text-sm">Net Price:</p>
              <p className="text-end text-balance text-sm text-gray-500">
                ৳
                {product?.data?.price -
                  (product?.data?.price * product?.data?.discount) / 100}
              </p>
            </div>
            <Divider className="m-0" />
            <div className="flex justify-between items-center px-10 py-1">
              <p className="text-gray-600 font-semibold text-sm">Category:</p>
              <p className="text-end text-balance text-sm text-gray-500">
                {product?.data?.category}
              </p>
            </div>
            <Divider className="m-0" />
            <div className="flex justify-between items-center px-10 py-1">
              <p className="text-gray-600 font-semibold text-sm">
                Sub Category:
              </p>
              <p className="text-end text-balance text-sm text-gray-500">
                {product?.data?.subCategory}
              </p>
            </div>
            <Divider className="m-0" />
            <div className="flex justify-between items-center px-10 py-1">
              <p className="text-gray-600 font-semibold text-sm">Tag:</p>
              <p className="text-end text-balance text-sm text-gray-500">
                {product?.data?.tag}
              </p>
            </div>

            <div>
                <p className="text-textprimary font-serif text-[18px]">Please Pick Size</p>
              <Select
                className="w-full"
                placeholder="Select size"
                options={productSizeAndStockOptions}
                value={selectedOption}
                onChange={handleSelectChange}
              />
             
              {selectedOption && (
                <div>Selected size: {selectedOption}</div>
              )}
            </div>

            <p className="text-center mt-4">
              Delivery within 2-5 days nationwide. Same delivery charge for
              multiple products. Call for assistance:{" "}
              <span className="font-semibold">01324250470</span>
            </p>

            <div className="mt-6">
              <Button
                disabled={!selectedOption}
                className="bg-primary text-white uppercase tracking-wider font-semibold"
                onClick={() => dispatch(addToCart({...product?.data, _id: product?.data?._id, size: selectedOption }))} 

                block
                icon={<PlusOutlined />}
              >
                ADD TO CART
              </Button>
            </div>
          </div>
        </div>
      </Spin>

      <div className="mt-12 mb-12">
        <CustomeDivider title="Related Products" />
      </div>

      <RelatedProducts value={product?.data?.category} />
    </div>
  );
};

export default NewProductDetails;


