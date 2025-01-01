"use client";

import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { NowMenuImg } from "@/comp/img/NowMenuImg";
import { useCreateAccountStore } from "@/lib/account/useCreateAccountStore";
import { type AccountGeneral, accountSchema } from "now_menu_core";
import { Input } from "@/comp/input/Input";
import { Layout } from "@/comp/layout/Layout";
import { Button } from "@/comp/button/button";
import { Form } from "@/comp/form/form";

export default function PageAccountEditGeneral(): ReactNode {
    const router = useRouter();
    const { setGeneral } = useCreateAccountStore();
    const { register, handleSubmit } = useForm<AccountGeneral>({
        resolver: zodResolver(accountSchema.general),
    });

    function handleOnSubmit(form: AccountGeneral) {
        setGeneral(form);
        router.push("/profile");
    }

    return (
        <Layout.Container>
            <Layout.Header
                left={{ label: "voltar", href: "/profile" }}
            />
            <Layout.Title label="Informações gerais" />
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
        </Layout.Container>
    );
}
