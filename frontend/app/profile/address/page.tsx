"use client";

import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type { SignUpAddress } from "@/lib/signUp/signUpAddress";
import { signUpAddressSchema } from "@/lib/signUp/signUpAddressSchema";
import { useSignUpStore } from "@/lib/signUp/useSignUpStore";
import { Input } from "@/comp/input/Input";
import { Layout } from "@/comp/layout/Layout";
import { Button } from "@/comp/button/button";
import { Form } from "@/comp/form/form";

export default function ProfileAddressPage(): ReactNode {
    const router = useRouter();
    const { register, handleSubmit } = useForm<SignUpAddress>({
        resolver: zodResolver(signUpAddressSchema),
    });

    function handleOnSubmit(form: SignUpAddress) {
        console.log(form);
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
                        <Button.Submit label="SALVAR" />
                    </div>
                </Form.Container>
            </div>
        </Layout.Container>
    );
}
