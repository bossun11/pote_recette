import React from "react";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-96 bg-white rounded p-6 shadow-xl">
        <h2 className="text-2xl text-center font-bold mb-5 text-gray-800">ユーザー登録画面</h2>
        <form>
          <div className="mb-2">
            <label className="mb-2 text-sm" htmlFor="name">
              ユーザー名
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md outline-none"
              id="name"
              type="text"
            />
          </div>
          <div className="mb-2">
            <label className="mb-2 text-sm" htmlFor="email">
              メールアドレス
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md outline-none"
              id="email"
              type="text"
            />
          </div>
          <div className="mb-2">
            <label className="mb-2 text-sm" htmlFor="password">
              パスワード
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md outline-none"
              id="password"
              type="password"
            />
          </div>
          <div className="mb-5">
            <label className="mb-2 text-sm" htmlFor="passwordConfirmation">
              パスワード（確認用）
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md outline-none"
              id="passwordConfirmation"
              type="passwordConfirmation"
            />
          </div>
          <div className="flex justify-center">
            <button className="btn btn-active btn-primary">登録する</button>
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
