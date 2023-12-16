import { create } from "zustand";

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
    readonly setCNPJ: (cnpj: string) => void;
    readonly setName: (name: string) => void;
    readonly setTelephone: (telephone: string) => void;
    readonly setCEP: (cep: string) => void;
    readonly setAddress: (address: string) => void;
    readonly setDistrict: (district: string) => void;
    readonly setCity: (city: string) => void;
    readonly setState: (state: string) => void;
    readonly setEmail: (email: string) => void;
    readonly setPassword: (password: string) => void;
    readonly setPasswordMatch: (passwordMatch: string) => void;
    readonly setSuccess: (success: boolean) => void;
    readonly clear: () => void;
};

export const useSignUpStore = create<SignUpStore>((set) => ({
    values: initialState,
    success: false,
    setCNPJ: (cnpj: string) =>
        set(({ values }) => ({ values: { ...values, cnpj } })),
    setName: (name: string) =>
        set(({ values }) => ({ values: { ...values, name } })),
    setTelephone: (telephone: string) =>
        set(({ values }) => ({ values: { ...values, telephone } })),
    setCEP: (cep: string) =>
        set(({ values }) => ({ values: { ...values, cep } })),
    setAddress: (address: string) =>
        set(({ values }) => ({ values: { ...values, address } })),
    setDistrict: (district: string) =>
        set(({ values }) => ({ values: { ...values, district } })),
    setCity: (city: string) =>
        set(({ values }) => ({ values: { ...values, city } })),
    setState: (state: string) =>
        set(({ values }) => ({ values: { ...values, state } })),
    setEmail: (email: string) =>
        set(({ values }) => ({ values: { ...values, email } })),
    setPassword: (password: string) =>
        set(({ values }) => ({ values: { ...values, password } })),
    setPasswordMatch: (passwordMatch: string) =>
        set(({ values }) => ({
            values: { ...values, passwordMatch },
        })),
    setSuccess: (success: boolean) =>
        set(({ values }) => ({ values: { ...values, success } })),
    clear: () =>
        set(({ values }) => ({
            values: { ...values, ...initialState },
        })),
}));
