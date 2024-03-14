/* eslint-disable @typescript-eslint/no-explicit-any */


import { useState, useEffect } from "react";
import { Drawer } from "antd";

import { motion } from "framer-motion";
import logo from "../../assets/images/PNG-Richkid-Logo.png";
import { items } from "../../utils/item";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import ShoppingCart from "../shopingCart/ShoppingCart";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import Search from "antd/es/input/Search";

const NewHeader = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector(useCurrentUser);
  const cart = useAppSelector((state) => state.cart);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuItemClick = (menu: any) => {
    if (activeSubMenu === menu) {
      setActiveSubMenu("");
    } else {
      setActiveSubMenu(menu);
    }
  };

  const handleSubMenuClick = (item: any) => {
    const key = item.key;
    navigate(`/products/${key}`);
    setActiveSubMenu("");
    setDrawerVisible(false);
  };

  const handleOutsideClick = () => {
    setActiveSubMenu("");
  };

  const handleSearch = (value: string) => {
    // Navigate to the SearchResultProduct page with the search query as URL parameter
    navigate(`/products/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <motion.nav
      className="bg-white p-4 fixed top-0 left-0 right-0 z-10 border border-b-2 shadow "
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container h-[60px] mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="Richkid" className="h-10 w-auto mr-4" />
          </Link>
        </div>
        <div className="max-w-md justify-center items-center hidden sm:inline-flex">
          <Search
            placeholder="Search your product ..."
            allowClear
            size="small"
            onSearch={handleSearch} // Call handleSearch when the search button is clicked
          />
        </div>
        <div className="hidden sm:block">
          <div className="flex justify-center items-center  gap-2">
            {items?.map((item) => (
              <div
                key={item.key}
                className="relative"
                onClick={() => handleMenuItemClick(item.key)}
              >
                <button className="text-gray-600 hover:text-gray-300 focus:outline-none mr-4 flex items-center">
                  {item.label}
                  {item.children && (
                    <span>
                      {activeSubMenu === item.key ? (
                        <AiOutlineCaretUp className="ml-1" />
                      ) : (
                        <AiOutlineCaretDown className="ml-1" />
                      )}
                    </span>
                  )}
                </button>
                {item.children && activeSubMenu === item.key && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bg-white border mt-4 p-2 rounded shadow-lg"
                    style={{ zIndex: 999 }}
                  >
                    {item.children.map((child) => (
                      <button
                        key={child.key}
                        onClick={() => handleSubMenuClick(child)}
                        className="block text-gray-800 text-sm border-l-transparent hover:border-l-gray-500 border-l-4 text-center font-semibold w-[200px] cursor-pointer rounded-r-sm hover:bg-gray-200 py-1 px-1 mt-0 "
                      >
                        {child.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <ShoppingCart />
        </div>

        <button
          className="md:hidden text-black hover:text-gray-300 focus:outline-none"
          onClick={() => setDrawerVisible(true)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      <Drawer
        title="Menu"
        placement="right"
        closable={true}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        <div className="flex flex-col">
          <div className="max-w-md flex justify-center items-center">
            <Search
              placeholder="Search your product ..."
              allowClear
              size="small"
              onSearch={handleSearch} // Call handleSearch when the search button is clicked
            />
          </div>
          {items.map((item) => (
            <div key={item.key}>
              <button
                onClick={() => handleMenuItemClick(item.key)}
                className="text-gray-800 border-b  py-1 px-4 mb-2 flex  items-center text-end"
              >
                {item.label}
                {item.children && <AiOutlineCaretDown className="ml-4" />}
              </button>
              {item.children && activeSubMenu === item.key && (
                <div className="ml-4">
                  {item.children.map((child) => (
                    <button
                      key={child.key}
                      onClick={() => handleSubMenuClick(child)}
                      className="block text-gray-800 hover:bg-gray-200  py-1 px-4 mb-2  border-l-transparent hover:border-l-gray-500 border-l-4"
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Drawer>
      {drawerVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={handleOutsideClick}
        ></div>
      )}
    </motion.nav>
  );
};

export default NewHeader;
