import React, { FC } from "react";
import PageHelmet from "../PageHelmet";
import NeutralButton from "../Buttons/NeutralButton";

const PasswordResetRequest: FC = () => {
  return (
    <>
      <PageHelmet title="パスワードリセット" />
      <div className="flex items-start justify-center mt-24">
        <div className="card w-96 bg-white">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-5 flex items-center justify-center">
              パスワードリセット
            </h2>
            <form>
              <div className="mb-3">
                <label className="mb-2 text-sm" htmlFor="email">
                  メールアドレス
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md outline-none"
                  id="email"
                  type="email"
                />
              </div>
              <div className="card-actions justify-center">
                <NeutralButton buttonText="メールを送信する" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordResetRequest;
