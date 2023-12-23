"use client";

import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type { SignUpAccount } from "@/lib/signUp/signUpAccount";
import { signUpAccountSchema } from "@/lib/signUp/signUpAccountSchema";
import { useSignUpStore } from "@/lib/signUp/useSignUpStore";
import { Input } from "@/comp/input/Input";
import { Layout } from "@/comp/layout/Layout";
import { Button } from "@/comp/button/button";
import { Form } from "@/comp/form/form";

export default function SignUpAccountPage(): ReactNode {
    const router = useRouter();
    const { setAccountForm } = useSignUpStore();
    const { register, handleSubmit } = useForm<SignUpAccount>({
        resolver: zodResolver(signUpAccountSchema),
    });

    function handleOnSubmit(form: SignUpAccount) {
        setAccountForm(form);
        router.push("/signup/success");
    }

    return (
        <Layout.Container>
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
            <Layout.Title label="Acesso da conta" />
            <div className="py-2">
                <Form.Container onSubmit={handleSubmit(handleOnSubmit)}>
                    <Form.FieldContainer>
                        <Form.FieldTitle label="E-mail" />
                        <Input.Text {...register("email")} />
                    </Form.FieldContainer>
                    <Form.FieldContainer>
                        <Form.FieldTitle label="Senha" />
                        <Input.Text {...register("password")} />
                    </Form.FieldContainer>
                    <div className="pt-4">
                        <Button.Submit label="CONTINUAR" />
                    </div>
                </Form.Container>
            </div>
            <div className="flex justify-center">
                <span>Possui uma conta?</span>
                <button className="text-main font-bold px-1">
                    Entrar
                </button>
            </div>
        </Layout.Container>
    );
}
