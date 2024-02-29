/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleProductForDetailsQuery } from "../../redux/features/product/productApi";
import { Button, Divider, Image, Spin } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useAppDispatch } from "../../redux/hooks";
import {
  addToCart,
  selectSizeForAddToCart,
} from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetSingleProductForDetailsQuery(id);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedStok, setSelectedStok] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useAppDispatch();

  // Initialize selected size when component mounts
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
      setSelectedSize(selectedSizeValue);
      setSelectedStok(product.data.sizeStok[index].stock || "");
      dispatch(selectSizeForAddToCart(selectedSizeValue)); // Dispatch selected size
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

  return (
    <div className="container px-6 py-12 rounded-lg shadow-sm">
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

          <div className="md:w-1/2 md:border md:border-gray-300 md:p-6">
            <h2 className="text-2xl text-center font-semibold mb-0">
              {product?.data?.name}
            </h2>
            <Divider />
            <div className="md:flex md:justify-between md:items-center">
              <div className="md:w-1/2">
                <p className="text-xl text-orange-700 mb-4">
                  Price: ৳{product?.data?.price}
                </p>

                <div className="">
                  <p className="text-lg font-semibold">
                    Selected Size: {selectedSize}
                  </p>
                  <div className="flex gap-4">
                    {product?.data?.sizeStok?.map(
                      (item: any, index: number) => (
                        <button
                          key={index}
                          className={`border px-4 py-2 rounded ${
                            selectedSizeIndex === index
                              ? "bg-gray-600 text-white  border-2   h-8 w-8 rounded-full flex justify-center items-center"
                              : " border-2  border-green-300 h-8 w-8 rounded-full flex justify-center items-center"
                          } ${
                            item?.stock === 0 ? "line-through color-red" : ""
                          }`}
                          onClick={() => handleSizeSelect(index)}
                        >
                          {item?.size}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-lg font-semibold">
                    Stock: {selectedStok} {getStokIcon()}
                  </p>
                </div>
              </div>

              <div className="md:w-1/2">
                <p>Category:{product?.data?.category}</p>
                <p>Category:{product?.data?.subCategory}</p>
                <p>Tag:{product?.data?.tag}</p>
                <p className="text-balance">
                  Description:{product?.data?.description}
                </p>
              </div>
            </div>

            <p>
              সারাদেশে ২-৫ দিনে হোম-ডেলিভারি। একসাথে যত খুশি পণ্য অর্ডার করুন,
              ডেলিভারি চার্জ একই থাকবে । প্রয়োজনে কল করুনঃ 01324250470
            </p>
            <div className="mt-[30px]">
              <Button onClick={() => dispatch(addToCart(product?.data))} block>
                ADD TO CART
              </Button>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default ProductDetails;
