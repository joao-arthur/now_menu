"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInForm } from "@/lib/signIn/signInForm";
import { SignInFormSchema } from "@/lib/signIn/signInSchema";
import { Layout } from "@/comp/layout/Layout";
import { Input } from "@/comp/input/Input";
import { NowMenuImg } from "@/comp/img/NowMenuImg";

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
                            E-mail
                        </span>
                        <Input.Text {...register("email")} />
                    </div>
                    <div className="flex flex-col py-2">
                        <span className="text-typography text-sm">
                            Password
                        </span>
                        <Input.Text {...register("password")} />
                    </div>
                    <div className="pt-4">
                        <button className="w-full text-white font-bold bg-main rounded-lg cursor-pointer p-4 text-lg">
                            ACESSAR
                        </button>
                    </div>
                </form>
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
