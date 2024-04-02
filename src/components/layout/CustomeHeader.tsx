/* eslint-disable @typescript-eslint/no-unused-vars */
import image from "./..//../assets/images/PNG-Richkid-Logo.png";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";

import { FaLandMineOn } from "react-icons/fa6";
import { BellFilled, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Badge, Button, List, Modal } from "antd";


import { useState } from "react";
import {  TOrder, TReview } from "../../types/global.type";
import { clearReviewItems } from "../../redux/features/review/reviewSlice";
import { clearOrderItems } from "../../redux/features/order/orderSlice";

const CustomeHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
 
  const user = useAppSelector(useCurrentUser);
  const review = useAppSelector((state) => state.review);
  const order = useAppSelector((state) => state.order);

  const dispatch = useAppDispatch();

  
  const reviewsData = review.reviewItems;
  const ordersData =order.orderItems

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successfully");
  };

  //for modal---
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(clearReviewItems());
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //for order modal

  const showOrderModal = () => {
    setIsOrderModalOpen(true);
  };

  const handleOrederModalOk = () => {
    setIsOrderModalOpen(false);
    dispatch(clearOrderItems());
  };

  const handleCancelOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  return (
    <div className="flex justify-center  md:justify-between items-center bg-white md:p-2 px-1 md:px-8 fixed top-0 left-0 right-0 z-10  shadow ">
      <Link to="/">
        <img loading="lazy" src={image} alt="" className="bg-cover bg-center" />
      </Link>
      <div>
        <Button
          className="uppercase hidden md:block tracking-wider font-semibold text-primary"
          icon={<FaLandMineOn />}
        >
          {user?.role}
        </Button>
      </div>

      <div className="flex justify-center items-center gap-6">
        <Badge count={review.reviewItems.length}>
          <MailOutlined
            className="text-[24px]"
           
            onClick={showModal}
          />
        </Badge>
        <Badge count={order.orderItems.length}>
          <BellFilled className="text-[24px]" onClick={showOrderModal} />
        </Badge>
        <Button
          icon={<UserOutlined />}
          className="uppercase tracking-wide text-white font-semibold bg-[#7d3f98]"
          onClick={handleLogout}
        >
          Logout
        </Button>

        {/* for order modal */}

        <Modal
          title="Order Product"
          open={isOrderModalOpen}
          onOk={handleOrederModalOk}
          onCancel={handleCancelOrderModal}
        >
          <List
            className="bg-gray-200/50 px-5 rounded-md"
            dataSource={ordersData}
            renderItem={(item: TOrder) => {
              return (
                <List.Item>{` ${item.name}, has oreded. ${item.orderNumber}`}</List.Item>
              );
            }}
          />
        </Modal>

        {/* for review modal */}
        <Modal
          title="Product Reviews"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <List
            className="bg-gray-200/50 px-5 rounded-md"
            dataSource={reviewsData}
            renderItem={(item: TReview) => {
              return (
                <List.Item>{`Name: ${item.name}, Comments: ${item.description}`}</List.Item>
              );
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CustomeHeader;
