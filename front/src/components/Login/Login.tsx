import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { LoginParams } from "../../types/index";
import { login } from "../../lib/api/auth";
import { useAuthContext } from "../../context/AuthContext";
import PageHelmet from "../PageHelmet";
import { toast } from "react-toastify";
import LoadingSpinner from "../Loadings/LoadingSpinner";
import LoginForm from "./LoginForm";

const Login: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setIsSignedIn, setCurrentUser } = useAuthContext();

  const onSubmit = async (data: LoginParams) => {
    setLoading(true);
    try {
      const res = await login(data);
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers.client);
        Cookies.set("_uid", res.headers.uid);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);
        navigate("/");
        toast.success("ログインしました。");
      }
    } catch (e) {
      toast.error("ログインに失敗しました。");
    }
    setLoading(false);
  };

  return (
    <>
      <PageHelmet title="ログイン" />
      {loading && <LoadingSpinner />}
      <div className="flex flex-col items-center h-screen mt-20">
        <div className="w-96 bg-white rounded p-6 shadow-xl">
          <h2 className="text-2xl text-center font-bold mb-5 text-gray-800">ログイン画面</h2>
          <LoginForm onSubmit={onSubmit} />
        </div>
        <Link to="/password-reset-request" className="mt-6 link link-hover">
          パスワードをお忘れの方はこちら
        </Link>
        <Link to="/register" className="mt-1 link link-hover">
          アカウントをお持ちでない方はこちら
        </Link>
      </div>
    </>
  );
};

export default Login;
