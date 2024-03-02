import { FaFacebook, FaLinkedin, FaWhatsapp, FaTwitter } from "react-icons/fa";

const SocialIcons = () => (
  <div className="flex justify-center items-center gap-4">
    <FaFacebook className="text-3xl text-blue-500 hover:text-blue-600 cursor-pointer" />
    <FaLinkedin className="text-3xl text-blue-500 hover:text-blue-600 cursor-pointer" />
    <FaWhatsapp className="text-3xl text-green-500 hover:text-green-600 cursor-pointer" />
    <FaTwitter className="text-3xl text-blue-500 hover:text-blue-600 cursor-pointer" />
  </div>
);

export default SocialIcons;