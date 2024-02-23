// import { Outlet } from "react-router-dom";
// import Navbar from "../navbar/Navbar";


// const UserLayout = () => {
//   return (
//     <>
//    <Navbar/>
//       <div className="min-h-[calc(100vh-300px)]">
//         <Outlet></Outlet>
//       </div>
//     </>
//   );
// };

// export default UserLayout;

import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '60px' }}> {/* Add padding top equal to navbar height */}
        <Outlet />
      </div>
    </>
  );
};

export default UserLayout;
