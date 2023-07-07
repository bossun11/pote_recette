import { z } from "zod";
import { loginValidationSchema, registerValidationSchema } from "../utils/validationSchema";

export type SignUpParams = z.infer<typeof registerValidationSchema>;

export type LoginParams = z.infer<typeof loginValidationSchema>;

export type User = {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  image?: string;
  allowPasswordChange: boolean;
  created_at: Date;
  updated_at: Date;
};
