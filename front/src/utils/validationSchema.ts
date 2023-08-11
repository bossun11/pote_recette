import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z
    .string()
    .nonempty("メールアドレスは必須です")
    .email("正しいメールアドレスを入力してください"),
  password: z.string().nonempty("パスワードは必須です"),
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

const IMAGE_TYPES = ["image/jpeg", "image/png"];

export const profileValidationSchema = z.object({
  name: z.string().nonempty("名前は必須です").max(50, "50文字以下で入力してください"),
  email: z
    .string()
    .nonempty("メールアドレスは必須です")
    .email("正しいメールアドレスを入力してください"),
  image: z
    .any()
    .refine((value) => {
      if (!(value instanceof FileList)) return true;
      const file = value[0];
      if (!file) return true;
      if (file.size > 5000000) return false;
      if (!IMAGE_TYPES.includes(file.type)) return false;
      return true;
    }, "画像は5MB以下の.jpgまたは.pngファイルである必要があります")
    .transform((value) => (value instanceof FileList ? value[0] : undefined)),
});
