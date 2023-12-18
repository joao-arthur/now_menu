"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type { SignUpAddress } from "@/lib/signUp/signUpAddress";
import { signUpAddressSchema } from "@/lib/signUp/signUpAddressSchema";
import { useSignUpStore } from "@/lib/signUp/useSignUpStore";
import { TextInput } from "@/comp/input/TextInput";
import { Layout } from "@/comp/layout/Layout";

export default function SignUpAddressPage() {
    const router = useRouter();
    const { setAddressForm } = useSignUpStore();
    const { register, handleSubmit } = useForm<SignUpAddress>({
        resolver: zodResolver(signUpAddressSchema),
    });

    function handleOnSubmit(form: SignUpAddress) {
        setAddressForm(form);
        router.push("/signup/address");
    }

    return (
        <Layout.Container>
            <Layout.Content>
                <h3>Endereço</h3>
                <h5>Por favor preencha para continuar</h5>
                <form
                    className="flex flex-col"
                    onSubmit={handleSubmit(handleOnSubmit)}
                >
                    <div className="flex flex-col">
                        <span>CEP</span>
                        <TextInput {...register("cep")} />
                    </div>
                    <div className="flex flex-col">
                        <span>Endereço</span>
                        <TextInput {...register("address")} />
                    </div>
                    <div className="flex flex-col">
                        <span>Bairro</span>
                        <TextInput {...register("district")} />
                    </div>
                    <div className="flex flex-col">
                        <span>Cidade</span>
                        <TextInput {...register("city")} />
                    </div>
                    <div className="flex flex-col">
                        <span>Estado</span>
                        <TextInput {...register("state")} />
                    </div>
                    <button className="text-white font-bold bg-main rounded-lg cursor-pointer p-3">
                        Continuar
                    </button>
                </form>
                <div>
                    <span>Já possui uma conta?</span>
                    <button>Entrar!</button>
                </div>
            </Layout.Content>
        </Layout.Container>
    );
}
