import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });

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
              {...register("email", {
                required: "Emailが入力されていません。",
                minLength: { value: 4, message: "4文字以上で入力してください。" },
              })}
            />
            <p className="text-error">{errors.email?.message as React.ReactNode}</p>
          </div>
          <div className="mb-5">
            <label className="mb-2 text-sm" htmlFor="password">
              パスワード
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md outline-none"
              id="password"
              type="password"
              {...register("password", {
                required: "パスワードが入力されていません。",
                minLength: { value: 8, message: "8文字以上で入力してください。" },
              })}
            />
            <p className="text-error">{errors.password?.message as React.ReactNode}</p>
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
