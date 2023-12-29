"use client";

import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCreateAccountStore } from "@/lib/account/useCreateAccountStore";
import { type AccountAddress, accountSchema } from "now_menu_core";
import { Input } from "@/comp/input/Input";
import { Layout } from "@/comp/layout/Layout";
import { Button } from "@/comp/button/button";
import { Form } from "@/comp/form/form";

export default function PageAccountEditAddress(): ReactNode {
    const router = useRouter();
    const { setAddress } = useCreateAccountStore();
    const { register, handleSubmit } = useForm<AccountAddress>({
        resolver: zodResolver(accountSchema.address),
    });

    function handleOnSubmit(form: AccountAddress) {
        setAddress(form);
        router.push("/profile");
    }

    return (
        <Layout.Container>
            <Layout.Header
                left={{ label: "voltar", href: "/profile" }}
            />
            <Layout.Title label="Endereço do estabelecimento" />
            <div className="py-2">
                <Form.Container onSubmit={handleSubmit(handleOnSubmit)}>
                    <Form.FieldContainer>
                        <Form.FieldTitle label="CEP" />
                        <Input.Text {...register("cep")} />
                    </Form.FieldContainer>
                    <Form.FieldContainer>
                        <Form.FieldTitle label="Endereço" />
                        <Input.Text {...register("address")} />
                    </Form.FieldContainer>
                    <Form.FieldContainer>
                        <Form.FieldTitle label="Bairro" />
                        <Input.Text {...register("district")} />
                    </Form.FieldContainer>
                    <Form.FieldContainer>
                        <Form.FieldTitle label="Cidade" />
                        <Input.Text {...register("city")} />
                    </Form.FieldContainer>
                    <Form.FieldContainer>
                        <Form.FieldTitle label="Estado" />
                        <Input.Text {...register("state")} />
                    </Form.FieldContainer>
                    <div className="pt-4">
                        <Button.Submit label="CONTINUAR" />
                    </div>
                </Form.Container>
            </div>
        </Layout.Container>
    );
}
