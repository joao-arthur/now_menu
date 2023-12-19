"use client";

import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type { SignUpInfo } from "@/lib/signUp/signUpInfo";
import { signUpInfoSchema } from "@/lib/signUp/signUpInfoSchema";
import { useSignUpStore } from "@/lib/signUp/useSignUpStore";
import { NowMenuImg } from "@/comp/img/NowMenuImg";
import { TextInput } from "@/comp/input/TextInput";

export default function SignUpInfoPage(): ReactNode {
    const router = useRouter();
    const { setInfoForm } = useSignUpStore();
    const { register, handleSubmit } = useForm<SignUpInfo>({
        resolver: zodResolver(signUpInfoSchema),
    });

    function handleOnSubmit(form: SignUpInfo) {
        setInfoForm(form);
        router.push("/signup/address");
    }

    return (
        <div className="flex flex-col w-full h-full items-center">
            <div className="flex flex-col w-4/5 h-full">
                <div className="h-40 flex justify-center">
                    <NowMenuImg />
                </div>
                <h3 className="text-typography text-3xl font-bold">
                    Cadastre o seu restaurante
                </h3>
                <div className="py-2">
                    <form
                        className="flex flex-col"
                        onSubmit={handleSubmit(handleOnSubmit)}
                    >
                        <div className="flex flex-col py-2">
                            <span className="text-typography text-sm">
                                CNPJ
                            </span>
                            <TextInput {...register("cnpj")} />
                        </div>
                        <div className="flex flex-col py-2">
                            <span className="text-typography text-sm">
                                Nome do estabelecimento
                            </span>
                            <TextInput {...register("name")} />
                        </div>
                        <div className="flex flex-col py-2">
                            <span className="text-typography text-sm">
                                Telefone
                            </span>
                            <TextInput {...register("telephone")} />
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
