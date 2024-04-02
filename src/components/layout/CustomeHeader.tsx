/* eslint-disable @typescript-eslint/no-unused-vars */
import image from "./..//../assets/images/PNG-Richkid-Logo.png";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";

import { FaLandMineOn } from "react-icons/fa6";
import { BellFilled, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Badge, Button, Drawer, List, Modal } from "antd";

import { useGetAllOrdersQuery } from "../../redux/features/order/orderApi";
import { useState } from "react";
import { TOrder, TReview } from "../../types/global.type";
import { clearReviewItems } from "../../redux/features/review/reviewSlice";

const CustomeHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const user = useAppSelector(useCurrentUser);
  const review = useAppSelector((state) => state.review);

  const dispatch = useAppDispatch();

  const { data: orders } = useGetAllOrdersQuery("");
  const reviewsData = review.reviewItems;
  const ordersData = orders?.data?.length;

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
    dispatch(clearReviewItems())
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    
  };
  return (
    <div className="flex justify-center  md:justify-between items-center bg-white md:p-2 px-1 md:px-8 fixed top-0 left-0 right-0 z-10 border border-b-2 border-b-teal-600 shadow ">
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
            // onClick={() => {
            //   setReviewsOpen(true);
            // }}
            onClick={showModal}
          />
        </Badge>
        <Badge count={ordersData}>
          <BellFilled
            className="text-[24px]"
            onClick={() => {
              setOrderOpen(true);
            }}
          />
        </Badge>
        <Button
          icon={<UserOutlined />}
          className="uppercase tracking-wide text-white font-semibold bg-[#7d3f98]"
          onClick={handleLogout}
        >
          Logout
        </Button>

        <Drawer
          title="Order's"
          open={orderOpen}
          onClose={() => {
            setOrderOpen(false);
          }}
          maskClosable
        >
          <List
            dataSource={orders?.data}
            renderItem={(item: TOrder) => {
              return <List.Item>{item?.address} has ordered</List.Item>;
            }}
          />
        </Drawer>
        {/* <Drawer
          title="Reviews"
          open={reviewsOpen}
          onClose={() => {
            setReviewsOpen(false);
          }}
          maskClosable
        >
          <List
            dataSource={reviewsData}
            renderItem={(item: TReview) => {
              return <List.Item>{item.description}</List.Item>;
            }}
          ></List>
        </Drawer> */}

        {/* <Modal
          title="Product Reviews"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
           <List
            dataSource={reviewsData}
            renderItem={(item: TReview) => {
              return <List.Item>`Name:${item.name}, ${item.description}`</List.Item>;
            }}
          ></List>
        </Modal> */}

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
      return <List.Item>{`Name: ${item.name}, Comments: ${item.description}`}</List.Item>;
    }}
  />
</Modal>

      </div>
    </div>
  );
};

export default CustomeHeader;
