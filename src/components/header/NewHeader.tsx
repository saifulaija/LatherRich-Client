/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";
// import { Drawer } from "antd";
// import { DownOutlined } from "@ant-design/icons";
// import { motion } from "framer-motion";
// import logo from "../../assets/images/PNG-Richkid-Logo.png";

// const Navbar = () => {
//   const [drawerVisible, setDrawerVisible] = useState(false);
//   const [subMenuVisible, setSubMenuVisible] = useState("");
//   const [selectedMenuItem, setSelectedMenuItem] = useState("");

//   const handleSubMenuClick = (item) => {
//     console.log(item);
//     // Implement navigation logic here based on the clicked item
//     // Hide sub menu after item click
//     setSubMenuVisible("");
//   };

//   const handleMenuItemClick = (menu) => {
//     if (subMenuVisible === menu) {
//       setSubMenuVisible("");
//     } else {
//       setSubMenuVisible(menu);
//     }
//   };

//   return (
//     <motion.nav
//       className="bg-gray-800 p-4 fixed top-0 left-0 right-0 z-10"
//       initial={{ opacity: 1 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.3 }}
//     >
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center">
//           <img src={logo} alt="Richkid" className="h-8 w-auto mr-4" />
//         </div>
//         <div className="hidden sm:block">
//           <div className="flex justify-center items-center gap-2">
//             <button
//               className="text-white hover:text-gray-300 focus:outline-none mr-4 flex items-center"
//               onClick={() => handleMenuItemClick("men")}
//             >
//               Men's <DownOutlined className="ml-1" />
//             </button>
//             {subMenuVisible === "men" && (
//               <div className="absolute bg-white mt-32 p-0 -ms-20 rounded shadow-lg">
//                 <button
//                   onClick={() => {
//                     handleSubMenuClick("Men's Shoes");
//                     setSelectedMenuItem("Men's Shoes");
//                   }}
//                   className="block text-gray-800 hover:bg-gray-200 py-1 px-4 mb-2"
//                 >
//                   Men's Shoes
//                 </button>
//                 <button
//                   onClick={() => {
//                     handleSubMenuClick("Men's Shirts");
//                     setSelectedMenuItem("Men's Shirts");
//                   }}
//                   className="block text-gray-800 hover:bg-gray-200 py-1 px-4"
//                 >
//                   Men's Shirts
//                 </button>
//               </div>
//             )}
//             <button
//               className="text-white hover:text-gray-300 focus:outline-none mr-4 flex items-center"
//               onClick={() => handleMenuItemClick("women")}
//             >
//               Women's <DownOutlined className="ml-1" />
//             </button>
//             {subMenuVisible === "women" && (
//               <div className="absolute bg-white mt-10 p-2 rounded shadow-lg">
//                 <button
//                   onClick={() => {
//                     handleSubMenuClick("Women's Shoes");
//                     setSelectedMenuItem("Women's Shoes");
//                   }}
//                   className="block text-gray-800 hover:bg-gray-200 py-1 px-4 mb-2"
//                 >
//                   Women's Shoes
//                 </button>
//                 <button
//                   onClick={() => {
//                     handleSubMenuClick("Women's Dresses");
//                     setSelectedMenuItem("Women's Dresses");
//                   }}
//                   className="block text-gray-800 hover:bg-gray-200 py-1 px-4"
//                 >
//                   Women's Dresses
//                 </button>
//               </div>
//             )}
//             <button
//               className="text-white hover:text-gray-300 focus:outline-none flex items-center"
//               onClick={() => handleMenuItemClick("kids")}
//             >
//               Kids <DownOutlined className="ml-1" />
//             </button>
//             {subMenuVisible === "kids" && (
//               <div className="absolute bg-white mt-10 p-2 rounded shadow-lg">
//                 {/* Include submenu items for Kids */}
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="hidden md:inline-block">
//           {/* Add login button */}
//           <button className="btn">Login</button>
//         </div>
//         <button
//           className="md:hidden text-white hover:text-gray-300 focus:outline-none"
//           onClick={() => setDrawerVisible(true)}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16m-7 6h7"
//             ></path>
//           </svg>
//         </button>
//       </div>
//       <Drawer
//         title="Menu"
//         placement="right"
//         closable={true}
//         onClose={() => setDrawerVisible(false)}
//         visible={drawerVisible}
//       >
//         <div className="flex flex-col">
//           <button
//             onClick={() => handleMenuItemClick("men")}
//             className="text-gray-800 hover:bg-gray-200 py-1 px-4 mb-2 flex items-center"
//           >
//             Men's <DownOutlined className="ml-1" />
//           </button>
//           {subMenuVisible === "men" && (
//             <div className="ml-4">
//               <button
//                 onClick={() => {
//                   handleSubMenuClick("Men's Shoes");
//                   setSelectedMenuItem("Men's Shoes");
//                 }}
//                 className="block text-gray-800 hover:bg-gray-200 py-1 px-4 mb-2"
//               >
//                 Men's Shoes
//               </button>
//               <button
//                 onClick={() => {
//                   handleSubMenuClick("Men's Shirts");
//                   setSelectedMenuItem("Men's Shirts");
//                 }}
//                 className="block text-gray-800 hover:bg-gray-200 py-1 px-4"
//               >
//                 Men's Shirts
//               </button>
//             </div>
//           )}
//           <button
//             onClick={() => handleMenuItemClick("women")}
//             className="text-gray-800 hover:bg-gray-200 py-1 px-4 mb-2 flex items-center"
//           >
//             Women's <DownOutlined className="ml-1" />
//           </button>
//           {subMenuVisible === "women" && (
//             <div className="ml-4">
//               <button
//                 onClick={() => {
//                   handleSubMenuClick("Women's Shoes");
//                   setSelectedMenuItem("Women's Shoes");
//                 }}
//                 className="block text-gray-800 hover:bg-gray-200 py-1 px-4 mb-2"
//               >
//                 Women's Shoes
//               </button>
//               <button
//                 onClick={() => {
//                   handleSubMenuClick("Women's Dresses");
//                   setSelectedMenuItem("Women's Dresses");
//                 }}
//                 className="block text-gray-800 hover:bg-gray-200 py-1 px-4"
//               >
//                 Women's Dresses
//               </button>
//             </div>
//           )}
//           <button
//             onClick={() => handleMenuItemClick("kids")}
//             className="text-gray-800 hover:bg-gray-200 py-1 px-4 flex items-center"
//           >
//             Kids <DownOutlined className="ml-1" />
//           </button>
//           {subMenuVisible === "kids" && (
//             <div className="ml-4">
//               {/* Include submenu items for Kids */}
//             </div>
//           )}
//         </div>
//       </Drawer>
//     </motion.nav>
//   );
// };

// export default Navbar;

// import  { useState, useEffect, useRef } from "react";
// import { Drawer } from "antd";
// import { DownOutlined } from "@ant-design/icons";
// import { motion } from "framer-motion";
// import logo from "../../assets/images/PNG-Richkid-Logo.png";
// import { items } from "../../utils/item";

// const Navbar = () => {
//   const [drawerVisible, setDrawerVisible] = useState(false);
//   const [subMenuVisible, setSubMenuVisible] = useState("");
//   const [selectedMenuItem, setSelectedMenuItem] = useState("");
//   const submenuRef = useRef(null);

//   const handleSubMenuClick = (item) => {
//     console.log(item);
//     // Implement navigation logic here based on the clicked item
//     // Hide sub menu after item click
//     setSubMenuVisible("");
//   };

//   const handleMenuItemClick = (menu) => {
//     if (subMenuVisible === menu) {
//       setSubMenuVisible("");
//     } else {
//       setSubMenuVisible(menu);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (submenuRef.current && !submenuRef.current.contains(event.target)) {
//         setSubMenuVisible("");
//       }
//     };

//     document.body.addEventListener("click", handleClickOutside);

//     return () => {
//       document.body.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   return (
//     <motion.nav
//       className="bg-gray-800 p-4 fixed top-0 left-0 right-0 z-10"
//       initial={{ opacity: 1 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.3 }}
//     >
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center">
//           <img src={logo} alt="Richkid" className="h-8 w-auto mr-4" />
//         </div>
//         <div className="hidden sm:block">
//           <div className="flex justify-center items-center gap-2">
//             {items?.map((item) => (
//               <div key={item.key} className="relative">
//                 <button
//                   className="text-white hover:text-gray-300 focus:outline-none mr-4 flex items-center"
//                   onClick={() => handleMenuItemClick(item.key)}
//                 >
//                   {item.label} <DownOutlined className="ml-1" />
//                 </button>
//                 {subMenuVisible === item.key && (
//                   <motion.div
//                     ref={submenuRef}
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="absolute bg-white mt-10 p-2 rounded shadow-lg"
//                   >
//                     {item.children &&
//                       item.children.map((child) => (
//                         <button
//                           key={child.key}
//                           onClick={() => {
//                             handleSubMenuClick(child.label);
//                             setSelectedMenuItem(child.label);
//                           }}
//                           className="block text-gray-800 hover:bg-gray-200 py-1 px-4 mb-2"
//                         >
//                           {child.label}
//                         </button>
//                       ))}
//                   </motion.div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="hidden md:inline-block">
//           {/* Add login button */}
//           <button className="btn">Login</button>
//         </div>
//         <button
//           className="md:hidden text-white hover:text-gray-300 focus:outline-none"
//           onClick={() => setDrawerVisible(true)}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16m-7 6h7"
//             ></path>
//           </svg>
//         </button>
//       </div>
//       <Drawer
//         title="Menu"
//         placement="right"
//         closable={true}
//         onClose={() => setDrawerVisible(false)}
//         visible={drawerVisible}
//       >
//         <div className="flex flex-col">
//           {items.map((item) => (
//             <div key={item.key}>
//               <button
//                 onClick={() => handleMenuItemClick(item.key)}
//                 className="text-gray-800 hover:bg-gray-200 py-1 px-4 mb-2 flex items-center"
//               >
//                 {item.label} <DownOutlined className="ml-1" />
//               </button>
//               {subMenuVisible === item.key && (
//                 <div className="ml-4">
//                   {item.children &&
//                     item.children.map((child) => (
//                       <button
//                         key={child.key}
//                         onClick={() => {
//                           handleSubMenuClick(child.label);
//                           setSelectedMenuItem(child.label);
//                         }}
//                         className="block text-gray-800 hover:bg-gray-200 py-1 px-4 mb-2"
//                       >
//                         {child.label}
//                       </button>
//                     ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </Drawer>
//     </motion.nav>
//   );
// };

// export default Navbar;

// import { useState } from "react";
// import { Drawer } from "antd";
// import { DownOutlined, UpOutlined } from "@ant-design/icons";
// import { motion } from "framer-motion";
// import logo from "../../assets/images/PNG-Richkid-Logo.png";
// import { items } from "../../utils/item";

// const Navbar = () => {
//   const [drawerVisible, setDrawerVisible] = useState(false);
//   const [subMenuVisible, setSubMenuVisible] = useState("");

//   const handleMenuItemClick = (menu) => {
//     if (subMenuVisible === menu) {
//       setSubMenuVisible("");
//     } else {
//       setSubMenuVisible(menu);
//     }
//   };

//   const handleSubMenuClick = (item) => {
//     console.log("Clicked submenu item key:", item.key); // Logging the key of the clicked submenu item
//     setSubMenuVisible("");
//     setDrawerVisible(false); // Close the drawer after clicking a submenu item
//   };

//   const handleOutsideClick = () => {
//     setSubMenuVisible("");
//   };

//   return (
//     <motion.nav
//       className="bg-gray-800 p-4 fixed top-0 left-0 right-0 z-10"
//       initial={{ opacity: 1 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.3 }}
//     >
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center">
//           <img src={logo} alt="Richkid" className="h-8 w-auto mr-4" />
//         </div>
//         <div className="hidden sm:block">
//           <div className="flex justify-center items-center gap-2">
//             {items?.map((item) => (
//               <div
//                 key={item.key}
//                 className="relative"
//                 onMouseEnter={() => handleMenuItemClick(item.key)}
//                 onMouseLeave={() => setSubMenuVisible("")}
//               >
//                 <button
//                   className="text-white hover:text-gray-300 focus:outline-none mr-4 flex items-center"
//                 >
//                   {item.label}{" "}
//                   {item.children && (
//                     <span>
//                       {subMenuVisible === item.key ||
//                       window.innerWidth >= 768 ? (
//                         <UpOutlined className="ml-1" />
//                       ) : (
//                         <DownOutlined className="ml-1" />
//                       )}
//                     </span>
//                   )}
//                 </button>
//                 {item.children && subMenuVisible === item.key && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="absolute bg-white mt-10 p-2 rounded shadow-lg"
//                     style={{ zIndex: 999 }}
//                   >
//                     {item.children.map((child) => (
//                       <button
//                         key={child.key}
//                         onClick={() => handleSubMenuClick(child)}
//                         className="block text-gray-800 font-semibold w-[200px] hover:bg-gray-200 py-1 px-1 mt-0 "
//                       >
//                         {child.label}
//                       </button>
//                     ))}
//                   </motion.div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="hidden md:inline-block">
//           {/* Add login button */}
//           <button className="btn">Login</button>
//         </div>
//         <button
//           className="md:hidden text-white hover:text-gray-300 focus:outline-none"
//           onClick={() => setDrawerVisible(true)}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16m-7 6h7"
//             ></path>
//           </svg>
//         </button>
//       </div>
//       <Drawer
//         title="Menu"
//         placement="right"
//         closable={true}
//         onClose={() => setDrawerVisible(false)}
//         visible={drawerVisible}
//       >
//         <div className="flex flex-col">
//           {items.map((item) => (
//             <div key={item.key}>
//               <button
//                 onClick={() => handleMenuItemClick(item.key)}
//                 className="text-gray-800 hover:bg-gray-200 py-1 px-4 mb-2 flex items-center"
//               >
//                 {item.label}{" "}
//                 {item.children && <DownOutlined className="ml-1" />}
//               </button>
//               {item.children && subMenuVisible === item.key && (
//                 <div className="ml-4">
//                   {item.children.map((child) => (
//                     <button
//                       key={child.key}
//                       onClick={() => handleSubMenuClick(child)}
//                       className="block text-gray-800 hover:bg-gray-200 py-1 px-4 mb-2"
//                     >
//                       {child.label}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </Drawer>
//       {drawerVisible && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-20"
//           onClick={handleOutsideClick}
//         ></div>
//       )}
//     </motion.nav>
//   );
// };

// export default Navbar;
import { useState, useEffect } from "react";
import { Drawer } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import logo from "../../assets/images/PNG-Richkid-Logo.png";
import { items } from "../../utils/item";
import { useNavigate } from "react-router-dom";

const NewHeader = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const navigate =useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
 
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuItemClick = (menu:any) => {
    if (activeSubMenu === menu) {
      setActiveSubMenu("");
    } else {
      setActiveSubMenu(menu);
    }
  };

  const handleSubMenuClick = (item:any) => {
    console.log("Clicked submenu item key:", item.key);
    const key = item.key;
    

    navigate(`/products/${key}`)

    setActiveSubMenu("");
    setDrawerVisible(false);
  };

  const handleOutsideClick = () => {
    setActiveSubMenu("");
  };

  return (
    <motion.nav
      className="bg-zinc-600 p-4 fixed top-0 left-0 right-0 z-10"
      initial={{ opacity: 1 }}
      animate={{ opacity: .1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container h-[60px] mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Richkid" className="h-8 w-auto mr-4" />
        </div>
        <div className="hidden sm:block">
          <div className="flex justify-center items-center gap-2">
            {items?.map((item) => (
              <div
                key={item.key}
                className="relative"
                onClick={() => handleMenuItemClick(item.key)}
              >
                <button className="text-white hover:text-gray-300 focus:outline-none mr-4 flex items-center">
                  {item.label}{" "}
                  {item.children && (
                    <span>
                      {activeSubMenu === item.key ? (
                        <UpOutlined className="ml-1" />
                      ) : (
                        <DownOutlined className="ml-1" />
                      )}
                    </span>
                  )}
                </button>
                {item.children && activeSubMenu === item.key && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bg-white mt-10 p-2 rounded shadow-lg"
                    style={{ zIndex: 999 }}
                  >
                    {item.children.map((child) => (
                      <button
                        key={child.key}
                        onClick={() => handleSubMenuClick(child)}
                        className="block text-gray-800 font-semibold w-[200px] hover:bg-gray-200 py-1 px-1 mt-0 "
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
        <div className="hidden md:inline-block">
          <button className="btn">Login</button>
        </div>
        <button
          className="md:hidden text-white hover:text-gray-300 focus:outline-none"
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
          {items.map((item) => (
            <div key={item.key}>
              <button
                onClick={() => handleMenuItemClick(item.key)}
                className="text-gray-800 hover:bg-gray-200 py-1 px-4 mb-2 flex items-center"
              >
                {item.label}{" "}
                {item.children && <DownOutlined className="ml-1" />}
              </button>
              {item.children && activeSubMenu === item.key && (
                <div className="ml-4">
                  {item.children.map((child) => (
                    <button
                      key={child.key}
                      onClick={() => handleSubMenuClick(child)}
                      className="block text-gray-800 hover:bg-gray-200 py-1 px-4 mb-2"
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
