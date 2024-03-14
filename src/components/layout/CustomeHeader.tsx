/* eslint-disable @typescript-eslint/no-unused-vars */

import { AppstoreOutlined, CrownOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Flex, Menu } from "antd";


import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { useState } from "react";

const CustomeHeader = () => {
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

  const [logoutVisible, setLogoutVisible] = useState(false);
  console.log(logoutVisible)

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successfully");
    setLogoutVisible(false); 
  };

  const logoutMenu = (
    <Menu onClick={handleLogout}>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );
  return (
    <Flex align="center" justify="space-between">
     
     <Flex align="center" justify="center" gap={2}>
     <Avatar  icon={<AppstoreOutlined />} style={{ color: "#ffcc00", fontSize:'15px' }}/>
      <p style={{ color: "#ffcc00", fontSize:'14px' }}>GameGearTracker</p>
     </Flex>

      <Flex justify="center" align="center" gap={3}>
        <Avatar icon={<CrownOutlined style={{ color: "#ffcc00" }} />} />
        <p style={{ fontSize: '16px', fontWeight: 'bold', color: 'gold' }}>{user?.role}</p>
      </Flex>

      <Flex align="center" gap="3rem">
        <Flex align="center" gap="10px">
          <div className="header-right-content">
            <Dropdown overlay={logoutMenu} trigger={["click"]}>
             {user && user?.email ? ( <Avatar
         src={user?.email}
          size={32}
          className="avatar-dropdown"
        />):( <Avatar
          icon={<UserOutlined />}
          size={32}
          className="avatar-dropdown"
        />)}
            </Dropdown>
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CustomeHeader;
