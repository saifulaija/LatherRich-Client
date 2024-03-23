import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import router from "./routes/routes.tsx";
import { getTotals } from "./redux/features/cart/cartSlice.ts";
import Notification from "./components/notification/Notification.tsx";




store.dispatch(getTotals())

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <Notification/>
     
    </Provider>
    <Toaster position="top-center" richColors/>
   
  </React.StrictMode>
);
