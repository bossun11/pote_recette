import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const changeMenuState = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="drawer drawer-end z-50">
      <input
        type="checkbox"
        id="my-drawer"
        className="drawer-toggle"
        checked={isOpen}
        onChange={changeMenuState}
      />
      <div className="flex flex-col drawer-content">
        <nav className="bg-primary py-2 px-6">
          <div className="flex items-center justify-between">
            <div className="text-white text-2xl">Logo</div>
          </div>
        </nav>
        <label
          htmlFor="my-drawer"
          className="absolute top-1/2 right-0 p-4 transform -translate-y-1/2"
        >
          <svg
            className="swap-off fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          <li>
            <a href="#" className="text-gray-800 hover:bg-reddishBrown hover:text-white">
              ショップ検索
            </a>
          </li>
          <li>
            <Link
              to="/login"
              className="text-gray-800 hover:bg-reddishBrown hover:text-white"
              onClick={changeMenuState}
            >
              ログイン
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="text-gray-800 hover:bg-reddishBrown hover:text-white"
              onClick={changeMenuState}
            >
              ユーザー登録
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
      </div>
    </div>
  );
};

export default Header;
