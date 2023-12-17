"use client";

import { LogoImg } from "@/comp/img/LogoImg";
import { TextAreaInput } from "@/comp/input/TextAreaInput";
import { TextInput } from "@/comp/input/TextInput";
import { Layout } from "@/comp/layout/Layout";
import { useState } from "react";

export default function SignUpPage() {
    const [value, setValue] = useState();

    return (
        <Layout.Container>
            <Layout.Content>
                <LogoImg />
                <h3>Cadastrar</h3>
                <h5>Por favor cadastre-se para continuar</h5>
                <form className="flex flex-col">
                    <div className="flex flex-col">
                        <span>CNPJ</span>
                        <input
                            type="text"
                            name="cnpj"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <span>Nome do estabelecimento</span>
                        <input
                            type="text"
                            name="name"
                            required
                        />
                        <TextInput name="rhweriug" />
                    </div>
                    <div className="flex flex-col">
                        <span>Telefone</span>
                        <input
                            type="text"
                            name="telephone"
                            required
                        />
                    </div>

                    <TextAreaInput name="fehiu" />
                    <button className="text-white font-bold bg-main rounded-lg cursor-pointer p-3">
                        Continuar
                    </button>
                </form>
            </Layout.Content>
        </Layout.Container>
    );
}
