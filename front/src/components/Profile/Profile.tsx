import React, { FC } from "react";
import PageHelmet from "../PageHelmet";
import { useAuthContext } from "../../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import NeutralButton from "../Buttons/NeutralButton";

const Profile: FC = () => {
  const { currentUser } = useAuthContext();
  const { name, email, image } = currentUser || {};

  const buttonText = "プロフィールを編集する";
  return (
    <>
      <PageHelmet title={`${name}さんのプロフィール`} />
      <div className="flex items-center justify-center h-screen">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="avatar flex justify-center">
              <div className="w-40 rounded-full">
                <img src={image || "/images/default_user_image.png"} />
              </div>
            </div>
            <div className="mb-5 flex flex-col items-center">
              <div className="text-2xl text-gray-700 mb-2">ユーザー名</div>
              <div className="flex items-center">
                <FaUserCircle size={40} />
                <div className="font-bold text-3xl ml-3 text-gray-700">{name}</div>
              </div>
            </div>
            <div className="mb-5 flex flex-col items-center">
              <div className="text-2xl mb-2 text-gray-700">メールアドレス</div>
              <div className="flex items-center">
                <MdMail size={40} />
                <div className="font-bold text-3xl ml-3 text-gray-700">{email}</div>
              </div>
            </div>
            <div className="flex justify-center">
              <NeutralButton
                buttonText={buttonText}
                onClick={() => {
                  if (document)
                    (document.getElementById("edit_profile") as HTMLFormElement).showModal();
                }}
              />
            </div>

            {/* プロフィール編集モーダル */}
            <dialog id="edit_profile" className="modal">
              <form method="dialog" className="modal-box">
                <div className="flex flex-col items-center">
                  <div className="avatar flex justify-center">
                    <div className="w-40 rounded-full">
                      <img src={image || "/images/default_user_image.png"} />
                    </div>
                  </div>
                </div>
                <div className="modal-action">
                  <NeutralButton buttonText="更新する" />
                </div>
              </form>
            </dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
