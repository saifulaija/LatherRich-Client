




import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import chart from "../../assets/images/size-chart-for-women.jpg";
import Reviews from "./Reviews";
import { TProduct } from "../../types/product.type";
import TermsAndConditionsPage from "./TermsAndConditionsPage";

const onChange = (key: string) => {
  console.log(key);
};

const ProductTab: React.FC<{ description: string; product: TProduct }> = ({
  description,
  product,
}) => {
  console.log(description);
  const reviewsNumber=product?.reviews?.length
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Description",
      children: (
        <p className="text-textsecoundary text-[16px] text-start text-balance">
          {description}
        </p>
      ),
    },
    {
      key: "2",
      label: `Reviews(${reviewsNumber})`,
      children: <Reviews product={product} />,
    },
    {
      key: "3",
      label: "Product Chart",
      children: (
        <div className="flex justify-center items-center">
          <img src={chart} alt="Delivery chart" className="w-full max-w-md" />
        </div>
      ),
    },
    {
      key: "4",
      label:"Previlige's",
      children:<TermsAndConditionsPage/>
    },
  ];

  return (
    <Tabs
      tabBarGutter={20}
      defaultActiveKey="1"
      items={items}
      onChange={onChange}
    />
  );
};

export default ProductTab;

