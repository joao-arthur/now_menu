"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SignUpInfo } from "@/lib/signUp/signUpInfo";
import { signUpInfoSchema } from "@/lib/signUp/signUpInfoSchema";
import { LogoImg } from "@/comp/img/LogoImg";
import { TextInput } from "@/comp/input/TextInput";
import { Layout } from "@/comp/layout/Layout";

export default function SignUpPage() {
    const [value, setValue] = useState();

    const { register, handleSubmit } = useForm<SignUpInfo>({
        resolver: zodResolver(signUpInfoSchema),
    });

    function handleOnSubmit(form: SignUpInfo) {
        console.log(form);
    }

    return (
        <Layout.Container>
            <Layout.Content>
                <LogoImg />
                <h3>Cadastrar</h3>
                <h5>Por favor cadastre-se para continuar</h5>
                <form
                    className="flex flex-col"
                    onSubmit={handleSubmit(handleOnSubmit)}
                >
                    <div className="flex flex-col">
                        <span>CNPJ</span>
                        <TextInput {...register("cnpj")} />
                    </div>
                    <div className="flex flex-col">
                        <span>Nome do estabelecimento</span>
                        <TextInput {...register("name")} />
                    </div>
                    <div className="flex flex-col">
                        <span>Telefone</span>
                        <TextInput {...register("telephone")} />
                    </div>
                    <button className="text-white font-bold bg-main rounded-lg cursor-pointer p-3">
                        Continuar
                    </button>
                </form>
            </Layout.Content>
        </Layout.Container>
    );
}
