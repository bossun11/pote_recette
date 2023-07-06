import { z } from "zod";
import { loginValidationSchema, registerValidationSchema } from "../utils/validationSchema";

export type SignUpParams = z.infer<typeof registerValidationSchema>;

export type LoginParams = z.infer<typeof loginValidationSchema>;
