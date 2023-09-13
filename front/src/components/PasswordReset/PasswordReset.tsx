import React, { FC } from "react";
import PageHelmet from "../PageHelmet";
import NeutralButton from "../Buttons/NeutralButton";

const PasswordReset: FC = () => {
  return (
    <>
      <PageHelmet title="パスワードリセット" />
      <div className="flex items-start justify-center mt-24">
        <div className="card w-96 bg-white">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-5 flex items-center justify-center">
              パスワード変更
            </h2>
            <form>
              <div className="mb-5">
                <label className="mb-2 text-sm" htmlFor="password">
                  パスワード
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md outline-none"
                  id="password"
                  type="password"
                  placeholder="8文字以上で入力してください"
                />
              </div>
              <div className="mb-5">
                <label className="mb-2 text-sm" htmlFor="passwordConfirmation">
                  パスワード（確認用）
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md outline-none"
                  id="passwordConfirmation"
                  type="password"
                />
              </div>
              <div className="card-actions justify-center">
                <NeutralButton buttonText="パスワードを変更する" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
