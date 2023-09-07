import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import TopPage from "./components/TopPage/TopPage";
import { getCurrentUser } from "./lib/api/auth";
import { useAuthContext } from "./context/AuthContext";
import ShopSearch from "./components/ShopSearch/ShopSearch";
import ShopDetail from "./components/ShopDetail/ShopDetail";
import PublicRoute from "./components/routes/PublicRoute";
import PageNotFound from "./components/routes/PageNotFound";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/routes/PrivateRoute";
import TermsOfService from "./components/Header/TermsOfService";
import PrivacyPolicy from "./components/Header/PrivacyPolicy";
import ShopRankings from "./components/ShopRankings/ShopRankings";

const AppRoutes = () => {
  const { loading, setIsSignedIn, setCurrentUser, setLoading } = useAuthContext();

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

  if (loading) return null;

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/shop-search" element={<ShopSearch />} />
        <Route path="/shop-search/:id" element={<ShopDetail />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/shop-rankings"
          element={
            <PrivateRoute>
              <ShopRankings />
            </PrivateRoute>
          }
        />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
