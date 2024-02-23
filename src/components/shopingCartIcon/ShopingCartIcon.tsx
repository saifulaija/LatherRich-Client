import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import './ShopingCartIcon.css'

const ShopingCartIcon = () => {
  return (
    <div>
      <Badge count={7} className="soppingCartIcon">
        <ShoppingCartOutlined />
      </Badge>
    </div>
  );
};

export default ShopingCartIcon;
