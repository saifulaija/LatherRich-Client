import { Layout, Menu } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";

import { adminPaths } from "../../routes/admin.route";

import { AppstoreOutlined } from "@ant-design/icons";
import { verifyToken } from "../../utils/verifiToken";

import { userPaths } from "../../routes/user.route";
import { sidebarItemsGenerator } from "../../utils/newSidebarGenerator";

const { Sider } = Layout;

const userRole = {
  SUPERADMIN: "superAdmin",
  User: "user",
};

const SideBar = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  let sidebarItems;

  switch ((user as TUser)!.role) {
    case userRole.SUPERADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.SUPERADMIN);

      break;
    case userRole.User:
      sidebarItems = sidebarItemsGenerator(userPaths, userRole.User);

      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      theme="light"
      style={{
        height: "100vh",
        position: "sticky",
        top: "0",
        left: "0",
        bottom: 0,
      }}
    >
      <div
        style={{
          color: "gold",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2px",
        }}
      >
        <AppstoreOutlined />
        <h3>GameGearTracker</h3>
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["4"]}
        style={{
          marginTop: "30px",
        }}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default SideBar;
