import { Divider } from "antd";
import { ReactNode } from "react";
import { motion } from "framer-motion";

const CustomeDivider = ({ title }: { title: ReactNode }): JSX.Element => {
    return (
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:1.5,duration:1.5}}
        className="max-w-[1200px] mx-auto"
        >
            <Divider orientation="center"   style={{
            borderColor: "gray",
            color: "#7d3f98",
            fontSize: "15px",
            fontWeight: 600,
          }} className="uppercase tracking-wider ">{title}</Divider>
        </motion.div>
    );
};

export default CustomeDivider;
