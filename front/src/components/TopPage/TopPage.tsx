import React, { FC } from "react";
import NeutralButton from "../Buttons/NeutralButton";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import PageHelmet from "../PageHelmet";

const TopPage: FC = () => {
  const beforeLoginButtonText = "ログインして始める";
  const afterLoginButtonText = "お芋を探す";
  const { isSignedIn } = useAuthContext();

  return (
    <>
      <PageHelmet />
      <div className="relative">
        <div className="absolute inset-0 bg-neutral-content opacity-20"></div>
        <img className="w-full h-screen object-cover" src="/images/top_image.webp" alt="" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <img src="/images/logo.png" alt="" />
          <p className="text-white text-2xl pb-5">お芋専門店を気軽に探せるアプリです</p>
          {isSignedIn ? (
            <Link to="shop-search">
              <NeutralButton buttonText={afterLoginButtonText} />
            </Link>
          ) : (
            <Link to="login">
              <NeutralButton buttonText={beforeLoginButtonText} />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default TopPage;
