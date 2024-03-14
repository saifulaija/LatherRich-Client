


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

  useEffect(() => {
    const notificationTimer = setTimeout(() => {
      if (cartItems.length > 0 && !loading) {
        setLoading(true);
        setShowNotification(true);
        const recentProduct = cartItems[cartItems.length - 1];
        toast.success(
          <div>
            <p className="text-black text-sm text-center">Recently Viewed</p>
            <div className="flex items-center justify-center gap-2">
              <img
                src={recentProduct.images[0]}
                alt={recentProduct.name}
                className="w-8 h-8 mr-2 rounded-full"
              />
              <p className="text-sm text-black">{recentProduct.name}</p>
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
    }, 10000); 

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
