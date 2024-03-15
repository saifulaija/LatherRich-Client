/* eslint-disable @typescript-eslint/no-unused-vars */
import image from "./..//../assets/images/PNG-Richkid-Logo.png";


import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";

import { FaLandMineOn } from "react-icons/fa6";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button } from "antd";

const CustomeHeader = () => {
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

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
        <Button  className="uppercase tracking-wider font-semibold text-teal-700" icon={<FaLandMineOn />}>{user?.role}</Button>
      </div>

     

      <div>
        <Button
          icon={<UserOutlined />}
          className="uppercase tracking-wide font-semibold text-teal-700"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default CustomeHeader;
