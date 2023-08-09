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

const IMAGE_TYPES = ["image/jpeg", "image/png"];

export const profileValidationSchema = z.object({
  name: z.string().nonempty("名前は必須です").max(50, "50文字以下で入力してください"),
  email: z
    .string()
    .nonempty("メールアドレスは必須です")
    .email("正しいメールアドレスを入力してください"),
  image: z
    .object({
      0: z
        .object({
          size: z.number().max(5000000, "ファイルサイズは最大5MBです"),
          type: z
            .string()
            .refine((type) => IMAGE_TYPES.includes(type), ".jpgもしくは.pngのみ可能です"),
        })
        .optional(),
    })
    .transform((image) => (image instanceof FileList && image.length > 0 ? image[0] : undefined)),
});
