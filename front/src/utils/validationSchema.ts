import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z
    .string()
    .nonempty("メールアドレスは必須です")
    .email("正しいメールアドレスを入力してください"),
  password: z
    .string()
    .nonempty("パスワードは必須です")
    .min(8, "8文字以上で入力してください")
    .max(50, "50文字以下で入力してください"),
});

export const registerValidationSchema = z
  .object({
    name: z.string().nonempty("名前は必須です").max(50, "50文字以下で入力してください"),
    email: z
      .string()
      .nonempty("メールアドレスは必須です")
      .email("正しいメールアドレスを入力してください"),
    password: z
      .string()
      .nonempty("パスワードは必須です")
      .min(8, "8文字以上で入力してください")
      .max(50, "50文字以下で入力してください"),
    passwordConfirmation: z
      .string()
      .nonempty("パスワード(確認)は必須です")
      .min(8, "8文字以上で入力してください")
      .max(50, "50文字以下で入力してください"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "パスワードと確認用パスワードが一致していません",
    path: ["passwordConfirmation"],
  });

export const inputSearchValidationSchema = z.object({
  search: z.string().nonempty("検索ワードを入力してください"),
});

export const profileValidationSchema = z.object({
  name: z.string().nonempty("名前は必須です").max(50, "50文字以下で入力してください"),
  email: z
    .string()
    .nonempty("メールアドレスは必須です")
    .email("正しいメールアドレスを入力してください"),
});
