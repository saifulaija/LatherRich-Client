import { Layout } from "antd";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";


const CategoryLayout = () => {

 

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',

  lineHeight: '120px',
  color: 'gray',
  backgroundColor: '#fff',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  height:'100vh',
  color: '#fff',
  backgroundColor: '#fff',
  
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
};
  return (
    <Layout style={layoutStyle}  >
    <Header style={headerStyle} >

      <Navbar/>
    </Header>
    <Layout>
      <Sider  width="19%"  style={siderStyle}>
        <Sidebar/>
      </Sider>
      <Content  >
        <Outlet/>
      </Content>
    </Layout>
    <Footer style={footerStyle} >Footer</Footer>
  </Layout>
  );
};

export default CategoryLayout;