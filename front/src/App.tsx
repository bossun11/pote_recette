import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";

import { AuthProvider } from "./context/AuthContext";
import { ShopProvider } from "./context/ShopContext";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ShopProvider>
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="colored"
          />
          <AppRoutes />
        </ShopProvider>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
