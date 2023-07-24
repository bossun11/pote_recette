import React from "react";

import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { ShopProvider } from "./context/ShopContext";
import AppRoutes from "./AppRoutes";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ShopProvider>
          <AppRoutes />
        </ShopProvider>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
