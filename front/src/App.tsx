import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import TopPage from "./components/TopPage/TopPage";
import { getCurrentUser } from "./lib/api/auth";
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import ShopSearch from "./components/ShopSearch/ShopSearch";
import { ShopProvider } from "./context/ShopContext";

const App = () => {
  return (
    <AuthProvider>
      <ShopProvider>
        <AppContent />
      </ShopProvider>
    </AuthProvider>
  );
};

const AppContent = () => {
  const { setIsSignedIn, setCurrentUser, setLoading } = useAuthContext();

  // ログインしているユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop-search" element={<ShopSearch />} />
      </Routes>
    </Router>
  );
};

export default App;
