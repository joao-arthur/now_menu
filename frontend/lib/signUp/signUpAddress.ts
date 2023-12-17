import type { SignUp } from "./signUp";

export type SignUpAddress = Pick<
    SignUp,
    | "cep"
    | "address"
    | "district"
    | "city"
    | "state"
>;
