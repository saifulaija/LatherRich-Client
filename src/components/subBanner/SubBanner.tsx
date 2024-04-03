import {
  FaShippingFast,
  FaLock,
  FaCertificate,
  FaHeadset,
} from "react-icons/fa";
import { motion } from "framer-motion";

const SubBanner = () => {
  const parent = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const child = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <>
      <motion.div
        variants={parent}
        initial="hidden"
        animate="visible"
        transition={{ ease: "easeInOut", duration: 1.5, delayChildren: 0.5 , staggerChildren:0.5}}
        className=" max-w-[1200px] md:flex md:justify-center m-auto md:items-center -mt-4  shadow-transparent shadow-2xl  p-4"
      >
        <motion.div
          variants={child}
          className="flex items-center  rounded-md border border-l-[3px] border-l-primary p-4"
        >
          <FaShippingFast className="text-4xl text-blue-500 mr-4" />
          <div>
            <h4 className="text-lg font-semibold text-gray-800">
              Free Shipping
            </h4>
            <p className="text-sm text-gray-600 text-balance">
              We offer free shipping on all orders
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={child}
          className="flex items-center  rounded-md border border-l-[3px] border-l-primary p-4"
        >
          <FaLock className="text-4xl text-green-500 mr-4" />
          <div>
            <h4 className="text-lg font-semibold text-gray-800">
              Secure Payment
            </h4>
            <p className="text-sm text-gray-600 text-balance">
              Make secure payments for your orders
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={child}
          className="flex items-center  rounded-md border border-l-[3px] border-l-primary p-4"
        >
          <FaCertificate className="text-4xl text-yellow-500 mr-4" />
          <div>
            <h4 className="text-lg font-semibold text-gray-800">
              Quality Products
            </h4>
            <p className="text-sm text-gray-600 text-balance">
              We sell products from top-rated brands
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={child}
          className="flex items-center  rounded-md border border-l-[3px] border-l-primary p-4"
        >
          <FaHeadset className="text-4xl text-purple-500 mr-4" />
          <div>
            <h4 className="text-lg font-semibold text-gray-800">
              24/7 Support
            </h4>
            <p className="text-sm text-gray-600 text-balance">
              Get access to 24/7 support from our expert team
            </p>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default SubBanner;
