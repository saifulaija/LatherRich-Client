/* eslint-disable @typescript-eslint/no-unused-vars */
import image from "./..//../assets/images/PNG-Richkid-Logo.png";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";

import { FaLandMineOn } from "react-icons/fa6";
import { BellFilled, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Badge, Button, Drawer, List } from "antd";
import { useGetReviewsQuery } from "../../redux/features/review/reviewApi";
import { useGetAllOrdersQuery } from "../../redux/features/order/orderApi";
import { useState } from "react";

const CustomeHeader = () => {
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const { data: reviews } = useGetReviewsQuery("");
  const { data: orders } = useGetAllOrdersQuery("");
  const reviewsData = reviews?.data?.length;
  const ordersData = orders?.data?.length;

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successfully");
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
        <Badge count={reviewsData}>
          <MailOutlined
            className="text-[24px]"
            onClick={() => {
              setReviewsOpen(true);
            }}
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
            renderItem={(item) => {
             return <List.Item>{item.address} has ordered</List.Item>;
            }}
          ></List>
        </Drawer>
        <Drawer
          title="Reviews"
          open={reviewsOpen}
          onClose={() => {
            setReviewsOpen(false);
          }}
          maskClosable
        >
           <List
            dataSource={reviews?.data}
            renderItem={(item) => {
             return <List.Item>{item.description}</List.Item>;
            }}
          ></List>
        </Drawer>
      </div>
    </div>
  );
};

export default CustomeHeader;
