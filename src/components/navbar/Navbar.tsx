/* eslint-disable @typescript-eslint/no-explicit-any */

import "./Navbar.css";

import { useNavigate } from "react-router-dom";
import { Button, Drawer, Flex, Menu } from "antd";
import { useState } from "react";
import logo from '../../assets/images/PNG-Richkid-Logo.png'
import {
  ManOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import ShopingCartIcon from "../shopingCartIcon/ShopingCartIcon";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <Header className="navbar bg-white border border-b-orange-500">
      <div
        style={{
          paddingLeft: 12,
          paddingTop: 12,
        }}
        className="menuIcon"
      >
        <MenuOutlined
          style={{ color: "red", fontSize: "15px" }}
          onClick={() => {
            setOpenDrawer(true);
          }}
        />
      </div>
      <div className="logo">
      <img src={logo} alt="" />
      </div>
      <span className="headerMenu">
        <CustomeMenuHeader />
      </span>
      <Drawer
        onClose={() => {
          setOpenDrawer(false);
        }}
        open={openDrawer}
        closable={true}
        bodyStyle={{ backgroundColor: "white"}}
      >
        <CustomeMenuHeader  isInline />
      </Drawer>
      <Flex justify="center" align="center" gap={2}>
        <ShopingCartIcon />
        <Button className="bg-orange-800 text-white">Login</Button>
      </Flex>
    </Header>
  );
};

const CustomeMenuHeader = ({ isInline = false }) => {
  const navigate = useNavigate();

  const onMenuClick = (item: any) => {
    navigate(`/products/${item.key}`);
    console.log(item);
  };

  return (
    <div className="max-w-full">
      <Menu
        style={{ width: "100%", border: "none" }}
        
        onClick={onMenuClick}
        theme="light"
        mode={isInline ? "inline" : "horizontal"}
      >
        <Menu.SubMenu icon={<ManOutlined />} title="MEN">
          <Menu.Item key="man-casual" title="man-casual">
            CASUAL
          </Menu.Item>
          <Menu.Item key="man-formal" title="man-formal">
            FORMAL
          </Menu.Item>
          <Menu.Item key="man-sandals" title="men-sandals">
            SANDALS
          </Menu.Item>
          <Menu.Item key="man-sports" title="men-sports">
            SPORTS
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu icon={<WomanOutlined />} title="WOMEN">
          <Menu.Item key="women-casual" title="women-casual">
            CASUAL
          </Menu.Item>
          <Menu.Item key="women-formal" title="women-formal">
            FORMAL
          </Menu.Item>
          <Menu.Item key="women-sandals" title="women-sandals">
            SANDALS
          </Menu.Item>
          <Menu.Item key="women-pump-shoes" title="women-pump-shoes">
            PUMP SHOES
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu icon={<ShoppingCartOutlined />} title="GOODS">
          <Menu.Item
            key="accessories-money-bags"
            title="accessories-money-bags"
          >
            MONEY BAGS
          </Menu.Item>
          <Menu.Item key="accessories-belts" title="accessories-belts">
            BELTS
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default Navbar;