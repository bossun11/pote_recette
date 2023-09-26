import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

import { loginValidationSchema } from "../../utils/validationSchema";
import NeutralButton from "../Buttons/NeutralButton";
import { LoginParams } from "../../types/index";
import { login } from "../../lib/api/auth";
import { useAuthContext } from "../../context/AuthContext";
import PageHelmet from "../PageHelmet";
import { toast } from "react-toastify";

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginParams>({ resolver: zodResolver(loginValidationSchema) });

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

  const buttonText = "ログイン";

  return (
    <>
      <PageHelmet title="ログイン" />
      <div className="flex flex-col items-center h-screen mt-20">
        {loading && (
          <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
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
              <NeutralButton buttonText={buttonText} />
            </div>
          </form>
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
