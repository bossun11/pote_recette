import React from "react";

import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { ShopProvider } from "./context/ShopContext";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <AuthProvider>
      <ShopProvider>
        <AppRoutes />
      </ShopProvider>
    </AuthProvider>
  );
};

export default App;
