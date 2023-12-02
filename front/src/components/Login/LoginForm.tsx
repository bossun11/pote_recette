import React, { FC, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import NeutralButton from "../Buttons/NeutralButton";
import { loginValidationSchema } from "../../utils/validationSchema";
import { LoginParams } from "../../types/index";

type LoginFormProps = {
  onSubmit: (_data: LoginParams) => void; // eslint-disable-line no-unused-vars
};

const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const [isRevealPassword, setIsRevealPassword] = useState<boolean>(false);

  const buttonText = "ログイン";

  const handleRevealPassword = () => {
    setIsRevealPassword(!isRevealPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginParams>({ resolver: zodResolver(loginValidationSchema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <div className="mb-5 relative">
        <label className="mb-2 text-sm" htmlFor="password">
          パスワード
        </label>
        <input
          className="w-full px-3 py-2 border rounded-md outline-none"
          id="password"
          type={isRevealPassword ? "text" : "password"}
          {...register("password")}
        />
        <span
          onClick={handleRevealPassword}
          className="absolute right-3 top-2/3 transform -translate-y-1/2"
        >
          {isRevealPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        {errors.password && <span className="text-error">{errors.password.message}</span>}
      </div>
      <div className="flex justify-center">
        <NeutralButton buttonText={buttonText} />
      </div>
    </form>
  );
};

export default LoginForm;
