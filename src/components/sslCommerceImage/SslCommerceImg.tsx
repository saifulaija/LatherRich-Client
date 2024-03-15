import { FaLock } from "react-icons/fa";
import image from "../../assets/images/new-ssl-commerce.png"; // Importing the image
import { AlipaySquareFilled } from "@ant-design/icons";

const SslCommerceImg = () => {
  return (
    <div className="container mx-auto md:flex md:justify-center items-center ">
      <div>
        <img
          loading="lazy"
          src={image}
          alt="SSL Commerce Logo"
          className="bg-cover bg-center "
        />
      </div>
      <div className="flex items-center  rounded-md border border-l-4 border-l-teal-600 p-4">
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
      <div className="flex items-center  rounded-md border border-l-4 border-l-teal-600 p-4">
        <AlipaySquareFilled className="text-4xl text-yellow-500 mr-4" />
        <div>
          <h4 className="text-lg font-semibold text-gray-600">
            Quality Products
          </h4>
          <p className="text-sm text-gray-600 text-balance">
            We sell products from top-rated brands
          </p>
        </div>
      </div>
    </div>
  );
};

export default SslCommerceImg;
