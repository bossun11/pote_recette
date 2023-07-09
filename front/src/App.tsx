import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import TopPage from "./components/TopPage/TopPage";
import { getCurrentUser } from "./lib/api/auth";
import { User } from "./types";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

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

  const AuthContextValue = useMemo(
    () => ({
      loading,
      setLoading,
      isSignedIn,
      setIsSignedIn,
      currentUser,
      setCurrentUser,
    }),
    [loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser],
  );

  return (
    <AuthContext.Provider value={AuthContextValue}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
