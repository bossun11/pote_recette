import React, { FC } from "react";
import PageHelmet from "../PageHelmet";
import NeutralButton from "../Buttons/NeutralButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const PasswordReset: FC = () => {
  const passwordResetValidationSchema = z.object({
    password: z
      .string()
      .nonempty("パスワードは必須です")
      .min(8, "パスワードは8文字以上で入力してください"),
    passwordConfirmation: z
      .string()
      .nonempty("パスワード（確認用）は必須です")
      .min(8, "パスワード（確認用）は8文字以上で入力してください"),
  });

  type PasswordResetParams = z.infer<typeof passwordResetValidationSchema>;

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const resetPasswordToken = params.get("reset_password_token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetParams>({
    resolver: zodResolver(passwordResetValidationSchema),
  });

  const onSubmit = async (data: PasswordResetParams) => {
    try {
      axios.put(`${process.env.REACT_APP_BACKEND_API_URL}/auth/password`, {
        password: data.password,
        password_confirmation: data.passwordConfirmation,
        reset_password_token: resetPasswordToken,
      });
      toast.success("パスワードを変更しました。");
      navigate("/login");
    } catch (e) {
      toast.error("パスワードの変更に失敗しました。");
    }
  };

  return (
    <>
      <PageHelmet title="パスワードリセット" />
      <div className="flex items-start justify-center mt-24">
        <div className="card w-96 bg-white">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-5 flex items-center justify-center">
              パスワード変更
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
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
              </div>
              {errors.password && <span className="text-error">{errors.password.message}</span>}
              <div className="mb-3">
                <label className="mb-2 text-sm" htmlFor="passwordConfirmation">
                  パスワード（確認用）
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md outline-none"
                  id="passwordConfirmation"
                  type="password"
                  {...register("passwordConfirmation")}
                />
              </div>
              {errors.passwordConfirmation && (
                <span className="text-error">{errors.passwordConfirmation.message}</span>
              )}
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
