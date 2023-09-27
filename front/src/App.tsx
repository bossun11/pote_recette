import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";
import ReactGA from "react-ga4";

import { AuthProvider } from "./context/AuthContext";
import { ShopProvider } from "./context/ShopContext";
import AppRoutes from "./AppRoutes";

const App = () => {
  const gaMeasurementId: string | undefined = process.env.REACT_APP_GA_MEASUREMENT_ID;
  if (gaMeasurementId) {
    ReactGA.initialize(gaMeasurementId);
    ReactGA.send({ hitType: "pageview", page: "/" });
  }

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
