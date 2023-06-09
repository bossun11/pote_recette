import React, { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  changeMenuState: () => void;
};

const BeforeLoginMenu: FC<Props> = ({ changeMenuState }) => {
  return (
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
  );
};

export default BeforeLoginMenu;
