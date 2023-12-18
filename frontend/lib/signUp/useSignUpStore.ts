import { create } from "zustand";
import type { SignUpInfo } from "./signUpInfo";
import type { SignUpAddress } from "./signUpAddress";
import type { SignUpAccount } from "./signUpAccount";

type Values = {
    readonly cnpj: string;
    readonly name: string;
    readonly telephone: string;
    readonly cep: string;
    readonly address: string;
    readonly district: string;
    readonly city: string;
    readonly state: string;
    readonly email: string;
    readonly password: string;
    readonly passwordMatch: string;
};

const initialState = {
    cnpj: "",
    name: "",
    telephone: "",
    cep: "",
    address: "",
    district: "",
    city: "",
    state: "",
    email: "",
    password: "",
    passwordMatch: "",
    success: false,
};

type SignUpStore = {
    readonly values: Values;
    readonly success: boolean;
    readonly setInfoForm: (infoForm: SignUpInfo) => void;
    readonly setAddressForm: (addressForm: SignUpAddress) => void;
    readonly setAccountForm: (accountForm: SignUpAccount) => void;
    readonly clear: () => void;
};

export const useSignUpStore = create<SignUpStore>((set) => ({
    values: initialState,
    success: false,
    setInfoForm: (infoForm: SignUpInfo) =>
        set(({ values }) => ({
            values: { ...values, ...infoForm },
        })),
    setAddressForm: (addressForm: SignUpAddress) =>
        set(({ values }) => ({
            values: { ...values, ...addressForm },
        })),
    setAccountForm: (accountForm: SignUpAccount) =>
        set(({ values }) => ({
            values: { ...values, ...accountForm },
        })),
    clear: () =>
        set(({ values }) => ({
            values: { ...values, ...initialState },
        })),
}));
