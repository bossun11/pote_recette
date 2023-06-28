import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <nav className="bg-primary py-2 px-6">
      <div className="flex items-center justify-between">
        <div className="text-white text-2xl">Logo</div>
        <button type="button" className="text-white" onClick={() => setIsOpen(!isOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>
      <div
        className={`${
          isOpen ? "" : "hidden"
        } absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl`}
      >
        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
          ショップ検索
        </a>
        <Link
          to="/login"
          className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
        >
          ログイン
        </Link>
        <div className="m-2 border border-base-200"></div>
        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
          利用規約
        </a>
        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
          プライバシーポリシー
        </a>
        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
          お問い合わせ
        </a>
      </div>
    </nav>
  );
};

export default Header;
