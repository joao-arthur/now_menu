import type { User, UserFromAPI } from "./user";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "@/components/Toast";
import { req } from "../core/req";

export function useSignUp(user: User) {
    return useMutation({
        mutationKey: ["signUp"],
        mutationFn: () =>
            Toast(req.post("user", user), {
                loading: "Cadastrando...",
                error: "Não foi possível cadastrar sua conta!",
                success: `Bem-vindo "${user.name}"!`,
            }),
    });
}

export function useGetUser() {
    return useMutation({
        mutationKey: ["getUser"],
        mutationFn: () => req.get<UserFromAPI>("user"),
    });
}

export function usePatchUser(user: Partial<UserFromAPI>) {
    return useMutation({
        mutationKey: ["patchUser"],
        mutationFn: () =>
            Toast(req.patch("user", user), {
                loading: "Atualizando suas informações...",
                error: "Não foi possível atualizar seus dados!",
                success: "Dados atualizados com sucesso!",
            }),
    });
}
