import React, { FC, useContext } from "react";
import NeutralButton from "../Buttons/NeutralButton";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const TopPage: FC = () => {
  const BTNTEXT = "ログインして始める";
  const { isSignedIn } = useContext(AuthContext);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-neutral-content opacity-20"></div>
      <img className="w-full h-screen object-cover" src="/images/top_image.jpg" alt="" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <img src="/images/logo.png" alt="" />
        <p className="text-white text-2xl pb-5">お芋専門店を気軽に探せるアプリです</p>
        {!isSignedIn && (
          <Link to="/login">
            <NeutralButton BTNTEXT={BTNTEXT} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default TopPage;
