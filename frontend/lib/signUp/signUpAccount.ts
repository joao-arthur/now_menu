import type { SignUp } from "./signUp";

export type SignUpAccount = Pick<
    SignUp,
    | "email"
    | "password"
>;
