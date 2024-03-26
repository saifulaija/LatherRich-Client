// import posthog from "posthog-js";
// import { useState, useEffect } from "react";

// const CookieBanner = () => {
//   const [showBanner, setShowBanner] = useState(true);

//   useEffect(() => {
//     const hasAcceptedCookies =
//       localStorage.getItem(
//         "__ph_opt_in_out_phc_Bf7srlA7Vf7CxgnOBQeRTlxqVEzU93PN1MU30YQ7Hhr"
//       ) === "1";
//     const hasDeclinedCookies =
//       localStorage.getItem(
//         "__ph_opt_in_out_phc_Bf7srlA7Vf7CxgnOBQeRTlxqVEzU93PN1MU30YQ7Hhr"
//       ) === "0";

//     if (hasAcceptedCookies || hasDeclinedCookies) {
//       setShowBanner(false);
//     }
//   }, []);

//   const acceptCookies = () => {
//     posthog.opt_in_capturing();
//     setShowBanner(false);
//     localStorage.setItem(
//       "__ph_opt_in_out_phc_Bf7srlA7Vf7CxgnOBQeRTlxqVEzU93PN1MU30YQ7Hhr",
//       "1"
//     );
//   };

//   const declineCookies = () => {
//     posthog.opt_out_capturing();
//     setShowBanner(false);
//     localStorage.setItem(
//       "__ph_opt_in_out_phc_Bf7srlA7Vf7CxgnOBQeRTlxqVEzU93PN1MU30YQ7Hhr",
//       "0"
//     );
//   };

//   return (
//     <div>
//       {showBanner && (
//         <div className="bg-white   p-4 rounded-lg shadow-inner border">
//           <p className="text-sm text-textsecoundary font-semibold">
//             We use tracking cookies to understand how you use the product and
//             help us improve it. Please accept cookies to help us improve.
//           </p>
//           <div className="mt-4">
//             <button
//               type="button"
//               onClick={acceptCookies}
//               className="bg-primary hover:bg-opacity-75  hover:translate-x-1 duration-75 ease-linear text-white  font-semibold py-2 px-4 rounded mr-4"
//             >
//               Accept Cookies
//             </button>
//             <button
//               type="button"
//               onClick={declineCookies}
//               className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded"
//             >
//               Decline Cookies
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CookieBanner;


import posthog from 'posthog-js';
import { useState, useEffect } from 'react';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem('__ph_opt_in_out_phc_Bf7srlA7Vf7CxgnOBQeRTlxqVEzU93PN1MU30YQ7Hhr') === '1';
    const hasDeclinedCookies = localStorage.getItem('__ph_opt_in_out_phc_Bf7srlA7Vf7CxgnOBQeRTlxqVEzU93PN1MU30YQ7Hhr') === '0';

    if (hasAcceptedCookies || hasDeclinedCookies) {
      setShowBanner(false);
    }
  }, []);

  const acceptCookies = () => {
    posthog.opt_in_capturing();
    setShowBanner(false);
    localStorage.setItem('__ph_opt_in_out_phc_Bf7srlA7Vf7CxgnOBQeRTlxqVEzU93PN1MU30YQ7Hhr', '1');
  };

  const declineCookies = () => {
    posthog.opt_out_capturing();
    setShowBanner(false);
    localStorage.setItem('__ph_opt_in_out_phc_Bf7srlA7Vf7CxgnOBQeRTlxqVEzU93PN1MU30YQ7Hhr', '0');
  };

  return (
    <div className={`fixed bottom-0 left-0 w-full bg-blue-200 z-50 p-4 ${showBanner ? '' : 'hidden'}`}>
      <div className="max-w-screen-lg mx-auto">
        <div className="text-sm text-texthexa font-semibold text-[14px]">
          We use tracking cookies to understand how you use the product and help us improve it.
          Please accept cookies to help us improve.
        </div>
        <div className="mt-4">
          <button
            type="button"
            onClick={acceptCookies}
            className="bg-primary hover:bg-opacity-75 duration-75 transition-opacity text-white font-semibold py-2 px-4 rounded mr-4"
          >
            Accept Cookies
          </button>
          <button
            type="button"
            onClick={declineCookies}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded"
          >
            Decline Cookies
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;

