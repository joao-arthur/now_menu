import { useMutation } from "@tanstack/react-query";
import { Fetch } from "../Core/Fetch";
import { Toast } from "../Components/Toast";

type userType = {
    cnpj: string;
    name: string;
    telephone: string;
    cep: string;
    address: string;
    district: string;
    city: string;
    state: string;
    email: string;
    password: string;
};

type userFromAPI = {
    cnpj: string;
    name: string;
    telephone: string;
    cep: string;
    address: string;
    district: string;
    city: string;
    state: string;
    email: string;
};

export function useSignUp(user: userType) {
    return useMutation({
        mutationKey: ["signUp"],
        mutationFn: () =>
            Toast(Fetch.post("user", user), {
                loading: "Cadastrando...",
                error: "Não foi possível cadastrar sua conta!",
                success: `Bem-vindo "${user.name}"!`,
            }),
    });
}

export function useGetUser() {
    return useMutation({
        mutationKey: ["getUser"],
        mutationFn: () => Fetch.get<userFromAPI>("user"),
    });
}

export function usePatchUser(user: Partial<userFromAPI>) {
    return useMutation({
        mutationKey: ["patchUser"],
        mutationFn: () =>
            Toast(Fetch.patch("user", user), {
                loading: "Atualizando suas informações...",
                error: "Não foi possível atualizar seus dados!",
                success: "Dados atualizados com sucesso!",
            }),
    });
}
