/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleProductForDetailsQuery } from "../../redux/features/product/productApi";
import { Button, Divider, Image, Spin } from "antd";
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
import chart from "../../assets/images/size-chart-for-women.jpg";

import RelatedProducts from "../../components/relatedProducts/RelatedProducts";
import { useTopBarLoader } from "../../utils/topBarLoader";
import LoadingBar from "react-top-loading-bar";

const ProductDetails = () => {
  const [progress, setProgress] = useState(0);
  useTopBarLoader(setProgress);

  const { id } = useParams();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedStok, setSelectedStok] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  cart.cartItems;

  const { data: product, isLoading } = useGetSingleProductForDetailsQuery(id);

  useEffect(() => {
    if (
      product &&
      product.data &&
      product.data.sizeStok &&
      product.data.sizeStok.length > 0
    ) {
      const initialSize = product.data.sizeStok[0].size || "";
      setSelectedSize(initialSize);
      setSelectedStok(product.data.sizeStok[0].stock || "");
      dispatch(selectSizeForAddToCart(initialSize)); // Dispatch initial selected size
    }
  }, [product, dispatch]);

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

  const handleImageClick = (index: any) => {
    setCurrentSlide(index);
  };

  const handleDecreaseCart = (product: any) => {
    console.log(product);
    dispatch(decreaseCart(product));
  };
  const handleIncreaseCart = (product: any) => {
    console.log(product);
    dispatch(addToCart(product));
  };

  return (
    <div className="container px-6 py-12 rounded-lg">
      <LoadingBar progress={progress} />
      <PageNavigation
        title={`products <RightOutlined /> ${product?.data?.subCategory} <RightOutlined />  ${product?.data?.name}`}
      />

      <Spin spinning={isLoading}>
        <div className="md:flex md:justify-center md:items-center md:gap-8 rounded">
          <div className="md:w-1/3 bg-white p-7">
            <div className=" flex justify-center items-center ">
              <Image
                src={product?.data?.images[currentSlide]}
                className="rounded-md w-full max-w-[300px] max-h-[200px] shadow-2xl"
                alt={`Image ${currentSlide + 1}`}
              />
            </div>
            <Divider />
            <div className="mt-2 flex justify-center items-center gap-3 overflow-x-auto flex-grow">
              {product?.data?.images.map((image: any, index: number) => (
                <img
                  width={50}
                  key={index}
                  src={image}
                  className={`rounded-md cursor-pointer ${
                    index === currentSlide ? "border-2 border-blue-500" : ""
                  }`}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
          </div>

          <div className="md:w-1/2 border border-gray-200 rounded-md  md:p-2">
            <h4 className="text-2xl text-center font-semibold text-gray-500 mb-0">
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
            <Divider className="m-0" />
            <div className="flex justify-center gap-4 items-center px-5 py-1">
              <p className="text-gray-600 font-semibold text-sm">
                Description:
              </p>
              <p className="text-end text-balance text-sm text-gray-500">
                {product?.data?.description}
              </p>
            </div>

            <Divider className="m-0" />
            <div className="md:flex justify-between items-center border p-5 rounded-md my-5">
              <div className=" flex-1">
                <p className="text-center text-gray-600 font-semibold underline-offset-2 underline ">
                  Select Size
                </p>
                <div className="flex justify-center items-center gap-4">
                  {product?.data?.sizeStok?.map((item: any, index: number) => (
                    <button
                      key={index}
                      className={`border px-4 py-0 rounded ${
                        selectedSizeIndex === index
                          ? " bg-teal-500 text-white px-4 py-0 rounded-md flex justify-center items-center"
                          : " bg-neutral-500 text-white px-4 py-0 rounded-md flex justify-center items-center"
                      } ${item?.stock === 0 ? "line-through color-red" : ""}`}
                      onClick={() => handleSizeSelect(index)}
                    >
                      size/{item?.size}
                    </button>
                  ))}
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

              <div className="">
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
            <div className="flex justify-center items-center">
              <img
                src={chart}
                alt="Delivery chart"
                className="w-full max-w-md"
              />
            </div>

            <div className="mt-[30px]">
              <Button
                className="border border-teal-600 text-gray-500 uppercase tracking-wider font-semibold"
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
        <Divider
          style={{
            borderColor: "gray",
            color: "#453433",
            fontSize: "18px",
            fontWeight: 400,
          }}
        >
          Related Products
        </Divider>
      </div>

      <RelatedProducts value={product?.data?.category} />
    </div>
  );
};

export default ProductDetails;
