import { Layout } from "antd";

import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import NewHeader from "../header/NewHeader";
import Footer from "../footer/Footer";
import GoToTop from "../goToTop/GoToTop";

const CategoryLayout = () => {
  const { Header, Sider, Content } = Layout;

  const siderStyle: React.CSSProperties = {
    textAlign: "center",
    marginTop: "18px",
    lineHeight: "35px",
    height: "100vh",
    maxHeight: "100%",
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
      <Header style={{backgroundColor:"#fff"}}>
        <NewHeader />
      </Header>
      <Layout>
        <Sider width="20%" style={siderStyle} className="hidden md:block">
          <Sidebar />
        </Sider>

        <Content className="bg-white min-h-screen">
          <Outlet />
        </Content>
      </Layout>
      <GoToTop />
      <Footer />
    </Layout>
  );
};

export default CategoryLayout;
