import React, { FC } from "react";
import { Link } from "react-router-dom";
import NeutralButton from "../Buttons/NeutralButton";

const PageNotFound: FC = () => {
  const buttonText = "ホームへ戻る";

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-2xl mt-3 mb-8">お探しのページは見つかりませんでした。</p>
      <Link to="/">
        <NeutralButton buttonText={buttonText} />
      </Link>
    </div>
  );
};

export default PageNotFound;
