import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import React, { FC } from "react";

type RouteProps = {
  children: React.ReactElement;
};

// ユーザーがログインしている場合には特定のルートにアクセスを許可しない
const PublicRoute: FC<RouteProps> = ({ children }) => {
  const { isSignedIn } = useAuthContext();

  return !isSignedIn ? children : <Navigate to="/" />;
};

export default PublicRoute;
