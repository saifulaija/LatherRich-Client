import {  Layout } from "antd";

import { Outlet } from "react-router-dom";





import CustomeHeader from "./CustomeHeader";
import SideBar from "./Sidebar";

const { Header, Content } = Layout;

const AdminLayout = () => {

 
  return (
    <Layout style={{ height: "100%" }}>
      <SideBar />
      <Layout>
        <Header className="header-new">
          <CustomeHeader />
        </Header>
        <Content style={{ margin: "64px 16px 0", overflow: "initial" }}>
          <div style={{ padding: 24, minHeight: "calc(100vh - 160px)" }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
