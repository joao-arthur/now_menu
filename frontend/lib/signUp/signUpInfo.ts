import type { SignUp } from "./signUp";

export type SignUpInfo = Pick<
    SignUp,
    | "cnpj"
    | "name"
    | "telephone"
>;
