import React, { FC, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";

import PageHelmet from "../PageHelmet";
import { useAuthContext } from "../../context/AuthContext";
import NeutralButton from "../Buttons/NeutralButton";
import { ProfileParams } from "../../types/index";
import { getAuthHeaders } from "../../utils/utils";
import ProfileEditModal from "./ProfileEditModal";
import LoadingSpinner from "../Loadings/LoadingSpinner";

const Profile: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser, setCurrentUser } = useAuthContext();
  const { name, email, image } = currentUser || {};
  const [previewImage, setPreviewImage] = useState<string | undefined>(image?.url);

  // モーダルを閉じる関数
  const closeModal = () => {
    const modal = document.getElementById("edit_profile") as HTMLDialogElement;
    modal.close();
  };

  const onSubmit = async (data: ProfileParams) => {
    const headers = getAuthHeaders();
    const profileData = new FormData();
    profileData.append("user[name]", data.name);
    profileData.append("user[email]", data.email);
    if (data.image) profileData.append("user[image]", data.image);
    closeModal();
    setLoading(true);
    try {
      const res = await axios.put(`${process.env.REACT_APP_BACKEND_API_URL}/profile`, profileData, {
        headers,
      });
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers.client);
        Cookies.set("_uid", res.headers.uid);
        toast.success("プロフィールを更新しました");
        setCurrentUser(res.data.data);
      }
    } catch (e) {
      toast.error("プロフィールの更新に失敗しました");
    }
    setLoading(false);
  };

  // 選択した画像をプレビュー表示する関数
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // reader.resultの型をチェック
        if (typeof reader.result === "string") setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <PageHelmet title={`${name}さんのプロフィール`} />
      {loading && <LoadingSpinner />}
      <div className="flex items-center justify-center h-screen">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body mx-10">
            <div className="avatar flex justify-center">
              <div className="w-36 rounded-full">
                <img src={image?.url} />
              </div>
            </div>
            <div className="mb-5 flex flex-col items-center">
              <div className="text-lg mb-2">ユーザー名</div>
              <div className="flex items-center">
                <FaUserCircle size={36} />
                <div className="text-2xl ml-3">{name}</div>
              </div>
            </div>
            <div className="mb-5 flex flex-col items-center">
              <div className="text-lg mb-2">メールアドレス</div>
              <div className="flex items-center">
                <MdMail size={36} />
                <div className="text-2xl ml-3">{email}</div>
              </div>
            </div>
            <div className="flex justify-center">
              <NeutralButton
                buttonText={"プロフィールを編集する"}
                onClick={() => {
                  if (document)
                    (document.getElementById("edit_profile") as HTMLFormElement).showModal();
                }}
              />
            </div>

            <ProfileEditModal
              previewImage={previewImage}
              onSubmit={onSubmit}
              handleImageChange={handleImageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
