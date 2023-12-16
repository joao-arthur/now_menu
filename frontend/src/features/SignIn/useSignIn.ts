import { useMutation } from "@tanstack/react-query";
import { Fetch } from "../../core/req";
import { decodeJWT } from "../../Core/DecodeJWT";
import { Toast } from "../../components/Toast";

type TokenAPI = {
    readonly token: string;
};

type User = {
    readonly email: string;
    readonly password: string;
};

export function useSignIn(user: User) {
    return useMutation({
        mutationKey: ["signIn"],
        mutationFn: () =>
            Toast(req.post<TokenAPI>("user/login", user), {
                loading: "Entrando...",
                error: "Usuário ou senha incorretos!",
                success: (res) =>
                    `Bem-vindo "${decodeJWT(res.token).name}"!`,
            }),
    });
}
