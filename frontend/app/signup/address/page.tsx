"use client";

import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type { SignUpAddress } from "@/lib/signUp/signUpAddress";
import { signUpAddressSchema } from "@/lib/signUp/signUpAddressSchema";
import { useSignUpStore } from "@/lib/signUp/useSignUpStore";
import { Input } from "@/comp/input/Input";

export default function SignUpAddressPage(): ReactNode {
    const router = useRouter();
    const { setAddressForm } = useSignUpStore();
    const { register, handleSubmit } = useForm<SignUpAddress>({
        resolver: zodResolver(signUpAddressSchema),
    });

    function handleOnSubmit(form: SignUpAddress) {
        setAddressForm(form);
        router.push("/signup/account");
    }

    return (
        <div className="flex flex-col w-full h-full items-center">
            <div className="flex flex-col w-4/5 h-full">
                <div className="h-32">
                    <div className="h-16 flex items-center">
                        <button
                            className="text-typography py-1"
                            onClick={() => {
                                router.back();
                            }}
                        >
                            voltar
                        </button>
                    </div>
                </div>
                <h3 className="text-typography text-3xl font-bold">
                    Endereço
                </h3>
                <h5 className="text-typography">
                    Preencha para continuar
                </h5>
                <div className="py-2">
                    <form
                        className="flex flex-col"
                        onSubmit={handleSubmit(handleOnSubmit)}
                    >
                        <div className="flex flex-col py-2">
                            <span className="text-typography text-sm">
                                CEP
                            </span>
                            <Input.Text {...register("cep")} />
                        </div>
                        <div className="flex flex-col py-2">
                            <span className="text-typography text-sm">
                                Endereço
                            </span>
                            <Input.Text {...register("address")} />
                        </div>
                        <div className="flex flex-col py-2">
                            <span className="text-typography text-sm">
                                Bairro
                            </span>
                            <Input.Text {...register("district")} />
                        </div>
                        <div className="flex flex-col py-2">
                            <span className="text-typography text-sm">
                                Cidade
                            </span>
                            <Input.Text {...register("city")} />
                        </div>
                        <div className="flex flex-col py-2">
                            <span className="text-typography text-sm">
                                Estado
                            </span>
                            <Input.Text {...register("state")} />
                        </div>
                        <div className="pt-4">
                            <button className="w-full text-white font-bold bg-main rounded-lg cursor-pointer p-4 text-lg">
                                CONTINUAR
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
