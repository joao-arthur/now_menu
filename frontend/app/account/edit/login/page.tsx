"use client";

import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCreateAccountStore } from "@/lib/account/useCreateAccountStore";
import { type AccountLogin, accountSchema } from "now_menu_core";
import { Input } from "@/comp/input/Input";
import { Layout } from "@/comp/layout/Layout";
import { Button } from "@/comp/button/button";
import { Form } from "@/comp/form/form";

export default function PageAccountEditLogin(): ReactNode {
    const router = useRouter();
    const { setLogin } = useCreateAccountStore();
    const { register, handleSubmit } = useForm<AccountLogin>({
        resolver: zodResolver(accountSchema.login),
    });

    function handleOnSubmit(form: AccountLogin) {
        setLogin(form);
        router.push("/profile");
    }

    return (
        <Layout.Container>
            <Layout.Header
                left={{ label: "voltar", href: "/profile" }}
            />
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
        </Layout.Container>
    );
}
