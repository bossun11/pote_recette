import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import React, { FC } from "react";

type RouteProps = {
  children: React.ReactElement;
};

// ユーザーがログインしている場合にのみ特定のルートにアクセスを許可
const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const { isSignedIn } = useAuthContext();

  return isSignedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
