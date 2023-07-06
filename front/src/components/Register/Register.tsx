import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerValidationSchema } from "../../utils/validationSchema";
import NeutralButton from "../Buttons/NeutralButton";
import { SignUpParams } from "../../types";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpParams>({ mode: "onChange", resolver: zodResolver(registerValidationSchema) });

  const navigate = useNavigate();

  const onSubmit = (data: SignUpParams) => {
    console.log(data);
    navigate("/login");
  };

  const BTNTEXT = "登録する";

  return (
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
            <NeutralButton BTNTEXT={BTNTEXT} />
          </div>
        </form>
      </div>
      <Link to="/login" className="mt-6 link link-hover">
        すでにアカウントをお持ちの方はこちら
      </Link>
    </div>
  );
};

export default Register;
