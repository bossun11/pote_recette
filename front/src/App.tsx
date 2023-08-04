import React from "react";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { ShopProvider } from "./context/ShopContext";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <AuthProvider>
      <ShopProvider>
        <ToastContainer
          position="bottom-center"
          draggable={false}
          pauseOnHover={false}
          theme="colored"
        />
        <AppRoutes />
      </ShopProvider>
    </AuthProvider>
  );
};

export default App;
