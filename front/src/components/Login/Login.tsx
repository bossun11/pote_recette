import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "../../utils/validationSchema";

type LoginForm = z.infer<typeof loginValidationSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange", resolver: zodResolver(loginValidationSchema) });

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

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
            <button className="btn btn-active btn-primary">ログイン</button>
          </div>
        </form>
      </div>
      <Link to="/register" className="mt-6 link link-hover">
        アカウントをお持ちでない方はこちら
      </Link>
    </div>
  );
};

export default Login;
