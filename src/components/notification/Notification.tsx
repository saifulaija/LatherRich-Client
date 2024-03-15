import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppSelector } from "../../redux/hooks";

const Notification = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(showNotification);

  useEffect(() => {
    const notificationTimer = setTimeout(() => {
      if (cartItems.length > 0 && !loading) {
        setLoading(true);
        setShowNotification(true);
        const recentProduct = cartItems[cartItems.length - 1];
        toast.success(
          // <div>
          //   <p className="text-black text-sm text-center">Recently Viewed</p>
          //   <div className="flex items-center justify-center gap-2">
          //     <img
          //       src={recentProduct.images[0]}
          //       alt={recentProduct.name}
          //       className="w-8 h-8 mr-2 rounded-full"
          //     />
          //     <p className="text-sm text-black">{recentProduct.name}</p>
          //   </div>
          // </div>,
          <div
            className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
            role="alert"
          >
            <div className="flex">
              <div className="py-1">
                <svg
                  className="fill-current h-6 w-6 text-teal-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">Our privacy policy has changed</p>
                <p className="text-sm">
                  Make sure you know how these changes affect you.
                </p>
              </div>
            </div>
          </div>,
          {
            className: "bg-green-500",
            bodyClassName: "text-white",
            progressClassName: "bg-white",
            autoClose: 5000,
            onClose: () => setLoading(false),
          }
        );
      }
    }, 60000);

    return () => clearTimeout(notificationTimer);
  }, [cartItems, loading, dispatch]);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        hideProgressBar={false}
      />
    </>
  );
};

export default Notification;
