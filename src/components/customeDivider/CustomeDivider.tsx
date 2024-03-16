import { Divider } from "antd";
import { ReactNode } from "react";

const CustomeDivider = ({ title }: { title: ReactNode }): JSX.Element => {
    return (
        <div className="max-w-[1000px] mx-auto">
            <Divider   style={{
            borderColor: "gray",
            color: "coral",
            fontSize: "18px",
            fontWeight: 800,
          }} className="uppercase tracking-wider">{title}</Divider>
        </div>
    );
};

export default CustomeDivider;
