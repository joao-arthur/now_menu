"use client";

import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type { SignUpInfo } from "@/lib/signUp/signUpInfo";
import { signUpInfoSchema } from "@/lib/signUp/signUpInfoSchema";
import { useSignUpStore } from "@/lib/signUp/useSignUpStore";
import { NowMenuImg } from "@/comp/img/NowMenuImg";
import { Input } from "@/comp/input/Input";
import { Layout } from "@/comp/layout/Layout";
import { Button } from "@/comp/button/button";

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
        <Layout.Container>
            <div className="h-40 flex justify-center">
                <NowMenuImg />
            </div>
            <div className="py-2">
                <form
                    className="flex flex-col"
                    onSubmit={handleSubmit(handleOnSubmit)}
                >
                    <div className="flex flex-col py-2">
                        <span className="text-typography text-sm">
                            CNPJ
                        </span>
                        <Input.Text {...register("cnpj")} />
                    </div>
                    <div className="flex flex-col py-2">
                        <span className="text-typography text-sm">
                            Nome do estabelecimento
                        </span>
                        <Input.Text {...register("name")} />
                    </div>
                    <div className="flex flex-col py-2">
                        <span className="text-typography text-sm">
                            Telefone
                        </span>
                        <Input.Text {...register("telephone")} />
                    </div>
                    <div className="pt-4">
                        <Button.Submit label="CADASTRAR" />
                    </div>
                </form>
            </div>
            <div className="flex justify-center">
                <span>Possui uma conta?</span>

                <button className="text-main font-bold px-1" onClick={() => router.push("/signin")}>
                    Entrar
                </button>
            </div>
        </Layout.Container>
    );
}
