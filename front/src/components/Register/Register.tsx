import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { SignUpParams } from "../../types";
import { signUp } from "../../lib/api/auth";
import { useAuthContext } from "../../context/AuthContext";
import PageHelmet from "../PageHelmet";
import { toast } from "react-toastify";
import LoadingSpinner from "../Loadings/LoadingSpinner";
import RegisterForm from "./RegisterForm";

const Register: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setIsSignedIn, setCurrentUser } = useAuthContext();

  const onSubmit = async (data: SignUpParams) => {
    setLoading(true);
    try {
      const res = await signUp(data);
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers.client);
        Cookies.set("_uid", res.headers.uid);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);
        navigate("/");
        toast.success("ユーザー登録が完了しました。");
      }
    } catch (e) {
      toast.error("ユーザー登録に失敗しました。");
    }
    setLoading(false);
  };

  return (
    <>
      <PageHelmet title="ユーザー登録" />
      {loading && <LoadingSpinner />}
      <div className="flex flex-col items-center mt-20">
        <div className="w-96 bg-white rounded p-6 shadow-xl">
          <h2 className="text-2xl text-center font-bold mb-5 text-gray-800">ユーザー登録画面</h2>
          <RegisterForm onSubmit={onSubmit} />
        </div>
        <Link to="/login" className="mt-6 mb-10 link link-hover">
          すでにアカウントをお持ちの方はこちら
        </Link>
      </div>
    </>
  );
};

export default Register;
