/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleProductForDetailsQuery } from "../../redux/features/product/productApi";
import { Button, Divider, Spin } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addToCart,
  decreaseCart,
  selectSizeForAddToCart,
} from "../../redux/features/cart/cartSlice";
import PageNavigation from "../../components/pageNavigation/PageNavigation";

import { FaMinus, FaPlus } from "react-icons/fa";


import RelatedProducts from "../../components/relatedProducts/RelatedProducts";
import { useTopBarLoader } from "../../utils/topBarLoader";
import LoadingBar from "react-top-loading-bar";
import ImageSlide from "./ImageSlide";
import CustomeDivider from "../../components/customeDivider/CustomeDivider";
import ProductTab from "../../components/tab/ProductTab";

const ProductDetails = () => {
  const [progress, setProgress] = useState(0);
  useTopBarLoader(setProgress);

  const { id } = useParams();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedStok, setSelectedStok] = useState("");

  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  cart.cartItems;

  const { data: product, isLoading } = useGetSingleProductForDetailsQuery(id);

  // useEffect(() => {
  //   if (
  //     product &&
  //     product.data &&
  //     product.data.sizeStok &&
  //     product.data.sizeStok.length > 0
  //   ) {
  //     const initialSize = product.data.sizeStok[0].size || "";
  //     setSelectedSize(initialSize);
  //     setSelectedStok(product.data.sizeStok[0].stock || "");
  //     dispatch(selectSizeForAddToCart(initialSize)); // Dispatch initial selected size
  //   }
  // }, [product, dispatch]);

  const handleSizeSelect = (index: any) => {
    if (
      product &&
      product.data &&
      product.data.sizeStok &&
      product.data.sizeStok[index]
    ) {
      const selectedSizeValue = product.data.sizeStok[index].size || "";
      const productId = product.data._id; // Assuming _id is stored in product.data._id
      setSelectedSize(selectedSizeValue);
      setSelectedStok(product.data.sizeStok[index].stock || "");
      dispatch(selectSizeForAddToCart({ productId, size: selectedSizeValue })); // Dispatch selected size and product ID
      setSelectedSizeIndex(index);
      console.log(productId)
    }
  };

  const getStokIcon = () => {
    const stokNumber = parseFloat(selectedStok);
    if (stokNumber > 0) {
      return <CheckCircleOutlined style={{ color: "green" }} />;
    } else {
      return <ExclamationCircleOutlined style={{ color: "red" }} />;
    }
  };

  const handleDecreaseCart = (product: any) => {
    console.log(product);
    dispatch(decreaseCart(product));
  };
  const handleIncreaseCart = (product: any) => {
    console.log(product);
    dispatch(addToCart(product));
  };

  const images = product?.data?.images;

  const ProductReviewData = product?.data

  const descriptions= product?.data?.description
  console.log({ descriptions });

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
          <ProductTab description={descriptions} product={ProductReviewData} />

          </div>
         </div>

          <div className="md:max-w-[60%] border border-gray-200 rounded-md  md:p-1">
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
          

         
            <div className="md:flex justify-between items-center border p-5 rounded-md my-5">
              <div className=" flex-1">
                <p className="text-center mb-3 text-gray-600 font-semibold underline-offset-2 underline ">
                  Select Size
                </p>
                <div className="flex justify-center items-center gap-4">
                  <div className="flex flex-wrap md:w-[65%] gap-3">
                  {product?.data?.sizeStok?.map((item: any, index: number) => (
                    <button
                      disabled={item.stock === 0}
                      key={index}
                      className={`border px-4 py-0 rounded ${
                        selectedSizeIndex === index
                          ? " bg-primary text-white px-4 py-0 rounded-md flex justify-center items-center"
                          : "  border border-primary text-texthexa font-semibold px-3 py-0 rounded-[5px] flex justify-center items-center"
                      } ${
                        item?.stock === 0 ? "line-through text-red-500 " : ""
                      }`}
                      onClick={() => handleSizeSelect(index)}
                    >
                      size/{item?.size}
                    </button>
                  ))}
                  </div>
                </div>

                <div className="flex justify-center items-center gap-2 mt-3 bg-neutral-100 p-1 text-balance rounded-md">
                  <p className="text-md text-gray-600 font-semibold">
                    Selected Size: {selectedSize}
                  </p>
                  <p className="text-md text-gray-600 font-semibold">
                    Stock: {selectedStok} {getStokIcon()}
                  </p>
                </div>
              </div>

              <div className="md:w-1/3">
                <p className="text-balance text-center font-semibold text-gray-600  underline-offset-2 underline">
                  Add Quantity
                </p>
                <div className="flex justify-center items-center gap-2 p-2 mt-2  border rounded-lg">
                  <button
                    onClick={() => handleDecreaseCart(product?.data)}
                    className="px-4 py-2 rounded-md  text-gray-700 hover:bg-gray-100 transition duration-300"
                  >
                    <FaMinus />
                  </button>
                  <div className="text-lg font-semibold">
                    {cart?.cartTotalQuantity}
                  </div>
                  <button
                    onClick={() => handleIncreaseCart(product?.data)}
                    className="px-4 py-2 rounded-md  text-gray-700 hover:bg-gray-100 transition duration-300"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>

            <p className=" text-balance text-center">
              সারাদেশে ২-৫ দিনে হোম-ডেলিভারি। একসাথে যত খুশি পণ্য অর্ডার করুন,
              ডেলিভারি চার্জ একই থাকবে । প্রয়োজনে কল করুনঃ
              <span className="font-semibold">01324250470</span>
            </p>
            {/* <div className="flex justify-center items-center">
              <img
                src={chart}
                alt="Delivery chart"
                className="w-full max-w-md"
              />
            </div> */}

            <div className="mt-[30px]">
              <Button
              disabled={selectedSizeIndex==0}
                className=" bg-primary text-white uppercase tracking-wider font-semibold"
                onClick={() => dispatch(addToCart(product?.data))}
                block
                icon={<PlusOutlined />}
              >
                ADD TO CART
              </Button>
            </div>
          </div>
        </div>
      </Spin>

      <div className="mt-12 mb-12 ">
        <CustomeDivider title="Related Product's" />
      </div>

      <RelatedProducts value={product?.data?.category} />
    </div>
  );
};

export default ProductDetails;
