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
import { Form } from "@/comp/form/form";

export default function ProfileInfoPage(): ReactNode {
    const router = useRouter();
    const { register, handleSubmit } = useForm<SignUpInfo>({
        resolver: zodResolver(signUpInfoSchema),
    });

    function handleOnSubmit(form: SignUpInfo) {
        console.log(form);
    }

    return (
        <Layout.Container>
            <div className="h-40 flex justify-center">
                <NowMenuImg />
            </div>
            <div className="py-2">
                <Form.Container onSubmit={handleSubmit(handleOnSubmit)}>
                    <Form.FieldContainer>
                        <Form.FieldTitle label="CNPJ" />
                        <Input.Text {...register("cnpj")} />
                    </Form.FieldContainer>
                    <Form.FieldContainer>
                        <Form.FieldTitle label="Nome do estabelecimento" />
                        <Input.Text {...register("name")} />
                    </Form.FieldContainer>
                    <Form.FieldContainer>
                        <Form.FieldTitle label="Telefone" />
                        <Input.Text {...register("telephone")} />
                    </Form.FieldContainer>
                    <div className="pt-4">
                        <Button.Submit label="CADASTRAR" />
                    </div>
                </Form.Container>
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
