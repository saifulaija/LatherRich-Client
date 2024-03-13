import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppSelector } from '../../redux/hooks';

const Notification = () => {
  const recentProduct = useAppSelector(state => state.cart.cartItems[0]);
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (recentProduct) {
      setShowNotification(true);
      toast.success(
        <div className="flex items-center">
          <img src={recentProduct.images[0]} alt={recentProduct.name} className="w-8 h-8 mr-2 rounded-full" />
          <p className="text-sm">{`Recently added: ${recentProduct.name}`}</p>
        </div>,
        {
          className: 'bg-green-500',
          bodyClassName: 'text-white',
          progressClassName: 'bg-white',
          autoClose: 60000 // 60 seconds
        }
      );
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 60000); // 60 seconds

      return () => clearTimeout(timer);
    }
  }, [recentProduct, dispatch]);

  return (
    <>
      {showNotification && (
        <ToastContainer
          position="bottom-right"
          autoClose={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      )}
    </>
  );
};

export default Notification;
