import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z
    .string()
    .nonempty("メールアドレスは必須です")
    .email("正しいメールアドレスを入力してください"),
  password: z.string().nonempty("パスワードは必須です").min(8, "8文字以上で入力してください"),
});
