import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ProfileParams } from "../../types";
import DefaultButton from "../Buttons/DefaultButton";
import NeutralButton from "../Buttons/NeutralButton";
import { profileValidationSchema } from "../../utils/validationSchema";
import { useAuthContext } from "../../context/AuthContext";

type ProfileEditModalProps = {
  previewImage: string | undefined;
  onSubmit: (_data: ProfileParams) => void; // eslint-disable-line no-unused-vars
  handleImageChange: (_e: React.ChangeEvent<HTMLInputElement>) => void; // eslint-disable-line no-unused-vars
};

const ProfileEditModal: FC<ProfileEditModalProps> = ({
  previewImage,
  onSubmit,
  handleImageChange,
}) => {
  const { currentUser } = useAuthContext();
  const { name, email } = currentUser || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileParams>({ resolver: zodResolver(profileValidationSchema) });

  return (
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
                onChange={handleImageChange}
              />
            </div>
            {errors.image && <span className="text-error">{errors.image.message}</span>}
            <div className="avatar">
              <div className="w-24 rounded-full mb-3">
                <img src={previewImage} />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-action">
          <DefaultButton buttonText="キャンセル" />
          <NeutralButton buttonText="更新する" onClick={handleSubmit(onSubmit)} />
        </div>
      </form>
    </dialog>
  );
};

export default ProfileEditModal;
