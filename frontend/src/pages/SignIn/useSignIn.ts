import { useMutation } from "@tanstack/react-query";
import { Fetch } from "../../Core/Fetch";
import { decodeJWT } from "../../Core/DecodeJWT";
import { Toast } from "../../Components/Toast";

type tokenAPI = {
    token: string;
};

type userType = {
    email: string;
    password: string;
};

export function useSignIn(user: userType) {
    return useMutation({
        mutationKey: ["signIn"],
        mutationFn: () =>
            Toast(Fetch.post<tokenAPI>("user/login", user), {
                loading: "Entrando...",
                error: "Usuário ou senha incorretos!",
                success: (res) =>
                    `Bem-vindo "${decodeJWT(res.token).name}"!`,
            }),
    });
}
