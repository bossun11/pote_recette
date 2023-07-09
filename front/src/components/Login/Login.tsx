import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

import { loginValidationSchema } from "../../utils/validationSchema";
import NeutralButton from "../Buttons/NeutralButton";
import { LoginParams } from "../../types/index";
import { login } from "../../lib/api/auth";
import { AuthContext } from "../../context/AuthContext";
import useToast from "../../hooks/useToast";
import Toast from "../Toasts/Toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginParams>({ mode: "onChange", resolver: zodResolver(loginValidationSchema) });

  const navigate = useNavigate();
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const { message, showToast, clearToast } = useToast();

  const onSubmit = async (data: LoginParams) => {
    try {
      const res = await login(data);
      // ログイン成功時にはCookieに各種情報を格納する
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers.client);
        Cookies.set("_uid", res.headers.uid);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);
        navigate("/");
      }
    } catch (e) {
      showToast("ログインに失敗しました。メールアドレスまたはパスワードが間違っています。");
    }
  };

  const BTNTEXT = "ログイン";

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-96 bg-white rounded p-6 shadow-xl">
        <h2 className="text-2xl text-center font-bold mb-5 text-gray-800">ログイン画面</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label className="mb-2 text-sm" htmlFor="email">
              メールアドレス
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md outline-none"
              id="email"
              type="email"
              {...register("email")}
            />
            {errors.email && <span className="text-error">{errors.email.message}</span>}
          </div>
          <div className="mb-5">
            <label className="mb-2 text-sm" htmlFor="password">
              パスワード
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md outline-none"
              id="password"
              type="password"
              {...register("password")}
            />
            {errors.password && <span className="text-error">{errors.password.message}</span>}
          </div>
          <div className="flex justify-center">
            <NeutralButton BTNTEXT={BTNTEXT} />
          </div>
        </form>
      </div>
      <Link to="/register" className="mt-6 link link-hover">
        アカウントをお持ちでない方はこちら
      </Link>
      {message && <Toast message={message} clearToast={clearToast} />}
    </div>
  );
};

export default Login;
