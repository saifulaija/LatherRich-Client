import { Typography } from "antd";

const TopNavbar = () => {
  return (
    <div className="border-t p-2 bg-primary m-0">
        <div className=" container h-2 flex justify-between items-center ">
        <Typography.Link href="tel:+123567">
            +8801874767969
        </Typography.Link>
        <Typography.Link href="tel:+123567">
           Privacy Policy
        </Typography.Link>
        <Typography.Link href="tel:+123567">
           Terms Of Use
        </Typography.Link>
    </div>
    </div>
  );
};

export default TopNavbar;
