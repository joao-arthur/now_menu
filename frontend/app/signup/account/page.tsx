"use client";

import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type { SignUpAccount } from "@/lib/signUp/signUpAccount";
import { signUpAccountSchema } from "@/lib/signUp/signUpAccountSchema";
import { useSignUpStore } from "@/lib/signUp/useSignUpStore";
import { TextInput } from "@/comp/input/TextInput";

export default function SignUpAccountPage(): ReactNode {
    const router = useRouter();
    const { setAccountForm } = useSignUpStore();
    const { register, handleSubmit } = useForm<SignUpAccount>({
        resolver: zodResolver(signUpAccountSchema),
    });

    function handleOnSubmit(form: SignUpAccount) {
        setAccountForm(form);
        router.push("/signup/address");
    }

    return (
        <div className="flex flex-col w-full h-full items-center">
            <div className="flex flex-col w-4/5 h-full">
                <div className="h-32">
                    <div className="h-16 flex items-center">
                        <button className="text-typography py-1">voltar</button>
                    </div>
                </div>
                <h3 className="text-typography text-3xl font-bold">
                    Conta
                </h3>
                <h5 className="text-typography">
                    Por favor preencha para continuar.
                </h5>
                <div className="py-2">
                    <form
                        className="flex flex-col"
                        onSubmit={handleSubmit(handleOnSubmit)}
                    >
                        <div className="flex flex-col py-2">
                            <span className="text-typography text-sm">
                                E-mail
                            </span>
                            <TextInput {...register("email")} />
                        </div>
                        <div className="flex flex-col py-2">
                            <span className="text-typography text-sm">
                                Senha
                            </span>
                            <TextInput {...register("password")} />
                        </div>
                        <div className="pt-4">
                            <button className="w-full text-white font-bold bg-main rounded-lg cursor-pointer p-4 text-lg">
                                Continuar
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex justify-center">
                    <span>Possui uma conta?</span>
                    <button className="text-main font-bold px-1">
                        Entrar
                    </button>
                </div>
            </div>
        </div>
    );
}
