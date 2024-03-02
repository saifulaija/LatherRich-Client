import {
  FaShippingFast,
  FaLock,
  FaCertificate,
  FaHeadset,
} from "react-icons/fa";

const SubBanner = () => {
  return (
   <div className=" ">
     <div className=" max-w-[1200px] md:flex md:justify-center m-auto md:items-center  p-4">
      <div className="flex items-center border border-green-500 rounded-md border-dashed p-4">
        <FaShippingFast className="text-4xl text-blue-500 mr-4" />
        <div>
          <h4 className="text-lg font-semibold text-gray-800">Free Shipping</h4>
          <p className="text-sm text-gray-600 text-balance">
            We offer free shipping on all orders
          </p>
        </div>
      </div>
      <div className="flex items-center border border-green-500 rounded-md border-dashed p-4">
        <FaLock className="text-4xl text-green-500 mr-4" />
        <div>
          <h4 className="text-lg font-semibold text-gray-800">
            Secure Payment
          </h4>
          <p className="text-sm text-gray-600 text-balance">
            Make secure payments for your orders
          </p>
        </div>
      </div>
      <div className="flex items-center border border-green-500 rounded-md border-dashed p-4">
        <FaCertificate className="text-4xl text-yellow-500 mr-4" />
        <div>
          <h4 className="text-lg font-semibold text-gray-800">
            Quality Products
          </h4>
          <p className="text-sm text-gray-600 text-balance">
            We sell products from top-rated brands
          </p>
        </div>
      </div>
      <div className="flex items-center border border-green-500 rounded-md border-dashed p-4">
        <FaHeadset className="text-4xl text-purple-500 mr-4" />
        <div>
          <h4 className="text-lg font-semibold text-gray-800">24/7 Support</h4>
          <p className="text-sm text-gray-600 text-balance">
            Get access to 24/7 support from our expert team
          </p>
        </div>
      </div>
    </div>
   </div>
  );
};

export default SubBanner;
