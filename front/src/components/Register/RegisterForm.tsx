import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignUpParams } from "../../types";
import NeutralButton from "../Buttons/NeutralButton";
import { registerValidationSchema } from "../../utils/validationSchema";

type RegisterFormProps = {
  onSubmit: (_data: SignUpParams) => void; // eslint-disable-line no-unused-vars
};

const RegisterForm: FC<RegisterFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpParams>({ resolver: zodResolver(registerValidationSchema) });

  const buttonText = "登録する";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <label className="mb-2 text-sm" htmlFor="name">
          ユーザー名
        </label>
        <input
          className="w-full px-3 py-2 border rounded-md outline-none"
          id="name"
          type="text"
          {...register("name")}
        />
        {errors.name && <span className="text-error">{errors.name.message}</span>}
      </div>
      <div className="mb-2">
        <label className="mb-2 text-sm" htmlFor="email">
          メールアドレス
        </label>
        <input
          className="w-full px-3 py-2 border rounded-md outline-none"
          id="email"
          type="email"
          {...register("email")}
        />
        {errors.email && <span className="text-error">{errors.email.message}</span>}
      </div>
      <div className="mb-2">
        <label className="mb-2 text-sm" htmlFor="password">
          パスワード
        </label>
        <input
          className="w-full px-3 py-2 border rounded-md outline-none"
          id="password"
          type="password"
          placeholder="8文字以上で入力してください"
          {...register("password")}
        />
        {errors.password && <span className="text-error">{errors.password.message}</span>}
      </div>
      <div className="mb-5">
        <label className="mb-2 text-sm" htmlFor="passwordConfirmation">
          パスワード（確認用）
        </label>
        <input
          className="w-full px-3 py-2 border rounded-md outline-none"
          id="passwordConfirmation"
          type="password"
          {...register("passwordConfirmation")}
        />
        {errors.passwordConfirmation && (
          <span className="text-error">{errors.passwordConfirmation.message}</span>
        )}
      </div>
      <div className="flex justify-center">
        <NeutralButton buttonText={buttonText} />
      </div>
    </form>
  );
};

export default RegisterForm;
