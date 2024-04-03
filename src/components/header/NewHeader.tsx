/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { Drawer, Menu } from "antd";
import { motion } from "framer-motion";
import logo from "../../assets/images/PNG-Richkid-Logo.png";
import { items } from "../../utils/item";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCart from "../shopingCart/ShoppingCart";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import Search from "antd/es/input/Search";
import SubMenu from "antd/es/menu/SubMenu";

const NewHeader = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  console.log(isMobile);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuItemClick = (menu: any) => {
    setActiveSubMenu(activeSubMenu === menu ? "" : menu);
  };

  const handleSubMenuClick = (item: any) => {
    navigate(`/products/${item.key}`);
    setActiveSubMenu("");
    setDrawerVisible(false);
  };

  const handleSearch = (value: string) => {
    navigate(`/products/search?q=${encodeURIComponent(value)}`);
  };

  const menuRef = useRef<HTMLDivElement>(null);
  const subMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        subMenuRef.current &&
        typeof subMenuRef.current.contains === "function" &&
        !subMenuRef.current.contains(e.target as Node) &&
        menuRef.current &&
        typeof menuRef.current.contains === "function" &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setActiveSubMenu("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <motion.nav
      className="bg-white h-[80px]  fixed top-0 left-0 right-0 z-10 border border-b-[1px] shadow-sm"
      initial={{ y: -150 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="container  mx-auto flex justify-between items-center">
        <motion.div
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex items-center"
        >
          <Link to="/">
            <img src={logo} alt="Richkid" className="h-10 w-auto mr-4" />
          </Link>
        </motion.div>
        <div  className="max-w-md justify-center items-center hidden sm:inline-flex">
          <Search
            placeholder="Search your product ..."
            allowClear
            size="middle"
            onSearch={handleSearch}
          />
        </div>

        <div className="hidden sm:block" ref={menuRef}>
          <div className="flex justify-center items-center gap-2">
            {items?.map((item) => (
              <div key={item.key} ref={subMenuRef}>
                <button
                  className="text-textprimary 
                     focus:outline-none font-medium mr-4 flex items-center"
                  onClick={() => handleMenuItemClick(item.key)}
                >
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
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0,  }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    exit={{ opacity: 0, y: 30 }}
                    className="absolute bg-primary  mt-4 p-4 rounded shadow-lg"
                    style={{ zIndex: 999 }}
                  >
                    {item.children.map((child) => (
                      <motion.button
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20, delay:.1 }}
                        key={child.key}
                        onClick={() => handleSubMenuClick(child)}
                        className="block text-gray-800 text-sm hover:border-b-2 hover:border-white hover:border-dashed hover:border-b-white  text-center font-semibold w-[200px] cursor-pointer hover:text-white rounded-r-s py-1 px-1 mt-0"
                      >
                        {child.label}
                      </motion.button>
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
              onSearch={handleSearch}
            />
          </div>
          <Menu mode="inline" theme="light">
            {items.map((item) => (
              <SubMenu key={item.key} title={item.label}>
                {item.children &&
                  item.children.map((child) => (
                    <Menu.Item
                      className=""
                      key={child.key}
                      onClick={() => handleSubMenuClick(child)}
                    >
                      {child.label}
                    </Menu.Item>
                  ))}
              </SubMenu>
            ))}
          </Menu>
        </div>
      </Drawer>
      {drawerVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setDrawerVisible(false)}
        ></div>
      )}
    </motion.nav>
  );
};

export default NewHeader;
