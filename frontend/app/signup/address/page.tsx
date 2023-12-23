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
        <Layout.Container>
            <Layout.Header
                left={{ label: "voltar", href: "/signup/info" }}
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
            <div className="flex justify-center">
                <span>Possui uma conta?</span>
                <button className="text-main font-bold px-1">
                    Entrar
                </button>
            </div>
        </Layout.Container>
    );
}
