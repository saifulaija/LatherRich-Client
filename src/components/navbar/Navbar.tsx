/* eslint-disable @typescript-eslint/no-explicit-any */

import "./Navbar.css";

import { useNavigate } from "react-router-dom";
import { Button, Drawer, Flex, Menu } from "antd";
import { useState } from "react";
import {
  DownOutlined,
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
    <Header className="navbar">
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
        <p>logo</p>
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
        bodyStyle={{ backgroundColor: "white" }}
      >
        <CustomeMenuHeader isInline />
      </Drawer>
      <Flex justify="center" align="center" gap={2}>
        <ShopingCartIcon />
        <Button>Login</Button>
      </Flex>
    </Header>
  );
};

const CustomeMenuHeader = ({ isInline = false }) => {
  const navigate = useNavigate();

  const onMenuClick = (item: any) => {
    navigate(`/${item.key}`);
    console.log(item);
  };

  return (
    <div>
      <Menu
        style={{ width: "100%", border: "none" }}
        onClick={onMenuClick}
        theme="light"
        mode={isInline ? "inline" : "horizontal"}
      >
        <Menu.SubMenu icon={<ManOutlined />} title="MEN">
          <Menu.Item key="mans-casual" title="mans-casual">
            CASUAL
          </Menu.Item>
          <Menu.Item key="mans-formal" title="mans-formal">
            FORMAL
          </Menu.Item>
          <Menu.Item key="mens-sandals" title="mens-sandals">
            SANDALS
          </Menu.Item>
          <Menu.Item key="mens-sports" title="mens-sports">
            SPORTS
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu icon={<WomanOutlined />} title="WOMEN">
          <Menu.Item key="womens-casual" title="womens-casual">
            CASUAL
          </Menu.Item>
          <Menu.Item key="womens-formal" title="womens-formal">
            FORMAL
          </Menu.Item>
          <Menu.Item key="womens-sandals" title="womens-sandals">
            SANDALS
          </Menu.Item>
          <Menu.Item key="womens-pump-shoes" title="womens-pump-shoes">
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
