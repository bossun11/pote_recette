import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { MdMail } from "react-icons/md";

import PageHelmet from "../PageHelmet";
import { useAuthContext } from "../../context/AuthContext";
import NeutralButton from "../Buttons/NeutralButton";
import { profileValidationSchema } from "../../utils/validationSchema";
import { ProfileParams } from "../../types/index";
import { zodResolver } from "@hookform/resolvers/zod";

const Profile: FC = () => {
  const { currentUser } = useAuthContext();
  const { name, email, image } = currentUser || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileParams>({ resolver: zodResolver(profileValidationSchema) });

  // モーダルを閉じる関数
  const closeModal = () => {
    const modal = document.getElementById("edit_profile") as HTMLDialogElement;
    modal.close();
  };

  const onSubmit = (data: ProfileParams) => {
    console.log(data);

    closeModal();
  };

  return (
    <>
      <PageHelmet title={`${name}さんのプロフィール`} />
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

            {/* プロフィール編集モーダル */}
            <dialog id="edit_profile" className="modal">
              <form method="dialog" className="modal-box">
                <div className="flex flex-col items-center">
                  <div className="font-bold text-2xl mb-7">プロフィール編集</div>

                  <div className="flex flex-col justify-start items-start">
                    <label className="text-lg" htmlFor="name">
                      ユーザー名
                    </label>
                    <div className="flex items-center">
                      <input
                        className="text-xl input input-bordered w-full max-w-xs"
                        type="text"
                        id="name"
                        defaultValue={name}
                        {...register("name")}
                      />
                    </div>
                    {errors.name && <span className="text-error">{errors.name.message}</span>}

                    <label className="text-lg mt-3" htmlFor="email">
                      メールアドレス
                    </label>
                    <div className="flex items-center">
                      <input
                        className="text-xl input input-bordered w-full max-w-xs"
                        type="text"
                        id="email"
                        defaultValue={email}
                        {...register("email")}
                      />
                    </div>
                    {errors.email && <span className="text-error">{errors.email.message}</span>}

                    <div className="my-3">
                      <label className="text-lg mb-2" htmlFor="image">
                        プロフィール画像
                      </label>
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        {...register("image")}
                        className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                      />
                    </div>
                    {errors.image && <span className="text-error">{errors.image.message}</span>}
                    <div className="avatar">
                      <div className="w-24 rounded-full mb-3">
                        <img src={image?.url || "/images/default_user_image.png"} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-action">
                  <button className="btn btn-active rounded-full">キャンセル</button>
                  <NeutralButton buttonText="更新する" onClick={handleSubmit(onSubmit)} />
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
