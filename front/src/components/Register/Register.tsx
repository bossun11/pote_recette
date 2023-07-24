import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

import { registerValidationSchema } from "../../utils/validationSchema";
import NeutralButton from "../Buttons/NeutralButton";
import { SignUpParams } from "../../types";
import { signUp } from "../../lib/api/auth";
import { useAuthContext } from "../../context/AuthContext";
import useToast from "../../hooks/useToast";
import Toast from "../Toasts/Toast";
import PageHelmet from "../PageHelmet";

const Register: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpParams>({ mode: "onChange", resolver: zodResolver(registerValidationSchema) });

  const navigate = useNavigate();
  const { setIsSignedIn, setCurrentUser } = useAuthContext();
  const { message, showToast, clearToast } = useToast();

  const onSubmit = async (data: SignUpParams) => {
    try {
      const res = await signUp(data);
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers.client);
        Cookies.set("_uid", res.headers.uid);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);
        navigate("/");
      }
    } catch (e) {
      showToast("ユーザー登録に失敗しました。");
    }
  };

  const buttonText = "登録する";

  return (
    <>
      <PageHelmet title="ユーザー登録" />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-96 bg-white rounded p-6 shadow-xl">
          <h2 className="text-2xl text-center font-bold mb-5 text-gray-800">ユーザー登録画面</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <label className="mb-2 text-sm" htmlFor="name">
                ユーザー名
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md outline-none"
                id="name"
                type="text"
                {...register("name")}
              />
              {errors.name && <span className="text-error">{errors.name.message}</span>}
            </div>
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
            <div className="mb-2">
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
            <div className="mb-5">
              <label className="mb-2 text-sm" htmlFor="passwordConfirmation">
                パスワード（確認用）
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md outline-none"
                id="passwordConfirmation"
                type="password"
                {...register("passwordConfirmation")}
              />
              {errors.passwordConfirmation && (
                <span className="text-error">{errors.passwordConfirmation.message}</span>
              )}
            </div>
            <div className="flex justify-center">
              <NeutralButton buttonText={buttonText} />
            </div>
          </form>
        </div>
        <Link to="/login" className="mt-6 link link-hover">
          すでにアカウントをお持ちの方はこちら
        </Link>
        {message && <Toast message={message} clearToast={clearToast} />}
      </div>
    </>
  );
};

export default Register;
