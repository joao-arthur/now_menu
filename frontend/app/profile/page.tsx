"use client";

import { AppLink } from "@/comp/AppLink";
import { UserFooter } from "@/comp/UserFooter";
import { Layout } from "@/comp/layout/Layout";

export default function ProfilePage() {
    function signOut() {
    }

    return (
        <>
            <div className="flex flex-col w-full h-full items-center">
                <div className="flex flex-col w-4/5 h-full">
                    <div className="h-40">
                        <Layout.Title label="Perfil" />
                    </div>

                    <nav className="flex flex-col gap-y-8">
                        <AppLink href="/profile/info">
                            <span className="cursor-pointer">Informações - Geral</span>
                        </AppLink>
                        <AppLink href="/profile/login">
                            <span className="cursor-pointer">Informações - Conta</span>
                        </AppLink>
                        <AppLink href="/profile/address">
                            <span className="cursor-pointer">Informações - Endereço</span>
                        </AppLink>
                        <AppLink href="/tables/edit">
                            <span className="cursor-pointer">Mesas</span>
                        </AppLink>
                        <AppLink href="/qrcode">
                            <span className="cursor-pointer">Visualizar QR Code</span>
                        </AppLink>
                        <span>Sair</span>
                    </nav>
                </div>
                <UserFooter current="profile" />
            </div>
        </>
    );
}
