
import { Link } from "react-router-dom";
import SocialIcons from "./SocialIcons";


const Footer = () => {
  return (
    <div className="w-full bg-tertiary">
      <div className="container m-auto md:flex justify-between items-center p-20 gap-x-20">
        <div className="leading-7">
          <h5 className="text-xl text-gray-600 font-semibold tracking-wide border-b-2 border-[#bb6e6e]">
            ABOUT US
          </h5>
          <p className="text-balance text-gray-500">
            Richkid is premium leather shoes and fashion accessories kingdom. We
            provide the best quality shoes and accessories for ladies and gents.
          </p>
        </div>
        <div className="leading-7">
          <h5 className="text-xl text-gray-600 font-semibold tracking-wide border-b-2 border-[#bb6e6e]">
            POLICY
          </h5>
          <div className="flex-start flex-column justify-center gap-4">
            <Link
              to="/complain"
              className="inline-block focus:outline-none hover:text-[#b35c5c] text-balance text-gray-500"
            >
              Exchange & Complaint
            </Link>
           
           
            <Link to="/" className="inline-block focus:outline-none hover:text-[#b35c5c] text-balance text-gray-500">
              Privacy Policy
            </Link>
            <Link to="/" className="inline-block focus:outline-none hover:text-[#b35c5c] text-balance text-gray-500">
            Terms and Conditions
            </Link>
           
          </div>
        </div>
        <div className="leading-7">
          <h5 className="text-xl text-gray-600 font-semibold tracking-wide border-b-2 border-[#bb6e6e]" >CONNECT WITH US</h5>
          <p className="text-balance text-gray-500">
            Join Our Facebook Group Richkid Offer and Review and Like Our Page.
          </p>

          <SocialIcons />
        </div>
      </div>
      <div className="bg-gray-900 text-white ">
        <p className="text-center text-balance pt-2 pb-10">
          Copyright © 2024 | LatherRich Lifestyle
        </p>
      </div>
    </div>
  );
};

export default Footer;
