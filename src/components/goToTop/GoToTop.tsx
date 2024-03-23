// import { FaArrowUp } from "react-icons/fa6";

// const GoToTop = () => {
//   const goToBtn = () => {
//     window.scroll({ top: 0, left: 0, behavior: "smooth" });
//   };
//   return (
//     <div className="flex justify-center items-center">
//       <div
//         className="top-btn w-[6rem] h-[6rem]  text-white bg-primary rounded-lg fixed b-[5rem] r-[5rem] z-[999] flex justify-center items-center cursor-pointer"
//         onClick={goToBtn}
//       >
//         <button>
//           <FaArrowUp />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default GoToTop;

// import { useEffect, useState } from "react";
// import { FaArrowUp } from "react-icons/fa";

// const GoToTop = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const goToBtn = () => {
//     window.scroll({ top: 0, left: 0, behavior: "smooth" });
//   };
//   const listenToScroll = () => {
//     let heightToHidden = 250;
//     const winScroll =
//       document.body.scroll || document.documentElement.scrollTop;
//     if (winScroll > heightToHidden) {
//       setIsVisible(true);
//     } else {
//       setIsVisible(false);
//     }
//   };
//   useEffect(() => {
//     window.addEventListener("scroll", listenToScroll);
//     return ()=>window.removeEventListener('scroll', listenToScroll)
//   }, []);

//   return (
//     <>
//       {isVisible && (
//         <div className="fixed bottom-10 right-10 z-50">
//           <button
//             className="bg-primary  text-white rounded-full w-16 h-16 flex justify-center items-center shadow-md focus:outline-none hover:bg-primary-dark transition-colors duration-300"
//             onClick={goToBtn}
//           >
//             <FaArrowUp className="animate-bounce" />
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default GoToTop;



import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const goToBtn = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };
  const listenToScroll = () => {
    const heightToHidden: number = 250; // Define as const
    const winScroll: number =
      (document.body.scrollTop || document.documentElement.scrollTop) as number; // Cast to number
    if (winScroll > heightToHidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-10 right-10 z-50">
          <button
            className="bg-primary text-white rounded-full w-12 h-12 flex justify-center items-center shadow-md focus:outline-none hover:bg-primary-dark transition-colors duration-300"
            onClick={goToBtn}
          >
            <FaArrowUp className="animate-bounce" />
          </button>
        </div>
      )}
    </>
  );
};

export default GoToTop;

