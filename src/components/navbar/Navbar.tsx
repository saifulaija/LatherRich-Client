import { Header } from "antd/es/layout/layout";
import "./Navbar.css";
import CustomeMenu from "../customeMenu/CustomeMenu";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <Header className="navbar">
        <div>logo</div>
        <CustomeMenu />

        <div>
            <Link to='/login'>
            
            Login
            </Link>
        </div>
      </Header>
    </div>
  );
};

export default Navbar;
