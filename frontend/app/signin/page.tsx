"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInForm } from "@/lib/signIn/signInForm";
import { SignInFormSchema } from "@/lib/signIn/signInSchema";
import { Layout } from "@/comp/layout/Layout";
import { Input } from "@/comp/input/Input";
import { NowMenuImg } from "@/comp/img/NowMenuImg";
import { Form } from "@/comp/form/form";

export default function SignInPage() {
    const router = useRouter();
    const { register, handleSubmit } = useForm<SignInForm>({
        resolver: zodResolver(SignInFormSchema),
    });

    function handleOnSubmit(form: SignInForm) {
        //router.push("/signup/account");
    }

    return (
        <Layout.Container>
            <div className="h-40 flex justify-center">
                <NowMenuImg />
            </div>
            <div className="py-2">
                <Form.Container onSubmit={handleSubmit(handleOnSubmit)}>
                    <Form.FieldContainer>
                        <Form.FieldTitle label="E-mail" />
                        <Input.Text {...register("email")} />
                    </Form.FieldContainer>
                    <Form.FieldContainer>
                        <Form.FieldTitle label="Password" />
                        <Input.Text {...register("password")} />
                    </Form.FieldContainer>
                    <div className="pt-4">
                        <button className="w-full text-white font-bold bg-main rounded-lg cursor-pointer p-4 text-lg">
                            ACESSAR
                        </button>
                    </div>
                </Form.Container>
            </div>
            <div className="flex justify-center">
                <span>Novo por aqui?</span>
                <button
                    className="text-main font-bold px-1"
                    onClick={() => router.push("/signup/info")}
                >
                    Crie uma conta
                </button>
            </div>
        </Layout.Container>
    );
}
