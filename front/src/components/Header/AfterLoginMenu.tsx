import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../lib/api/auth";
import Cookies from "js-cookie";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

type Props = {
  changeMenuState: () => void;
};

const AfterLoginMenu: FC<Props> = ({ changeMenuState }) => {
  const { setIsSignedIn, currentUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res.data.success === true) {
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        navigate("/");
        toast.success("ログアウトしました");
      }
    } catch (e) {
      toast.error("ログアウトに失敗しました");
    }
  };

  return (
    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
      <li>
        <div className="flex items-center hover:bg-reddishBrown hover:text-white">
          <img
            src={currentUser?.image || "/images/default_user_image.png"}
            alt=""
            className="w-12 rounded-full mr-2"
          />
          <span className="text-lg">{currentUser?.name}</span>
        </div>
      </li>
      <li>
        <Link
          to="shop-search"
          className="text-gray-800 hover:bg-reddishBrown hover:text-white"
          onClick={changeMenuState}
        >
          ショップ検索
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className="text-gray-800 hover:bg-reddishBrown hover:text-white"
          onClick={(e) => {
            e.preventDefault();
            changeMenuState();
            handleLogout();
          }}
        >
          ログアウト
        </Link>
      </li>
      <div className="divider my-0.5"></div>
      <li>
        <a href="#" className="text-gray-800 hover:bg-reddishBrown hover:text-white">
          利用規約
        </a>
      </li>
      <li>
        <a href="#" className="text-gray-800 hover:bg-reddishBrown hover:text-white">
          プライバシーポリシー
        </a>
      </li>
      <li>
        <a href="#" className="text-gray-800 hover:bg-reddishBrown hover:text-white">
          お問い合わせ
        </a>
      </li>
    </ul>
  );
};

export default AfterLoginMenu;
