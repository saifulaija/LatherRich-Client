import { Layout } from "antd";

import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import NewHeader from "../header/NewHeader";
import Footer from "../footer/Footer";

const CategoryLayout = () => {
  const { Header, Sider, Content } = Layout;

  const siderStyle: React.CSSProperties = {
    textAlign: "center",
    marginTop: "68px",
    lineHeight: "120px",
    height: "100vh",
    color: "#fff",
    backgroundColor: "#fff",
  };

  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
    maxWidth: "100%",
  };
  return (
    <Layout style={layoutStyle}>
      <Header>
        <NewHeader />
      </Header>
      <Layout>
        <Sider width="19%" style={siderStyle} className="hidden md:block">
          <Sidebar />
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>

      <Footer />
    </Layout>
  );
};

export default CategoryLayout;
