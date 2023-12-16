"use client";

import { LogoImg } from "@/comp/img/LogoImg";
import { Layout } from "@/comp/layout/Layout";

export default function SignUpPage() {
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
                    </div>
                    <div className="flex flex-col">
                        <span>Telefone</span>
                        <input
                            type="text"
                            name="telephone"
                            required
                        />
                    </div>
                    <button className="text-white font-bold bg-main rounded-lg cursor-pointer p-3">Continuar</button>
                </form>
            </Layout.Content>
        </Layout.Container>
    );
}
