import React, { FC } from "react";
import PageHelmet from "../PageHelmet";
import NeutralButton from "../Buttons/NeutralButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";

const PasswordResetRequest: FC = () => {
  const passwordResetRequestValidationSchema = z.object({
    email: z
      .string()
      .nonempty("メールアドレスは必須です")
      .email("正しいメールアドレスを入力してください"),
  });

  type PasswordResetRequestParams = z.infer<typeof passwordResetRequestValidationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetRequestParams>({
    resolver: zodResolver(passwordResetRequestValidationSchema),
  });

  const onSubmit = async (data: PasswordResetRequestParams) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/auth/password`,
        {
          email: data.email,
          redirectUrl: `${process.env.REACT_APP_HEROKU_FRONTEND_APP_URL}/password/edit`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      toast.success("パスワード再設定用のメールを送信しました。");
    } catch (e) {
      toast.error("パスワード再設定用のメールの送信に失敗しました。");
    }
  };

  return (
    <>
      <PageHelmet title="パスワードリセット" />
      <div className="flex items-start justify-center mt-24">
        <div className="card w-96 bg-white">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-5 flex items-center justify-center">
              パスワードリセット
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
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
