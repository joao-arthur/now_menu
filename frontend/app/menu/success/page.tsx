"use client";

import { useRouter } from "next/navigation";
import { WaitersImg } from "@/comp/img/WaitersImg";
import { Layout } from "@/comp/layout/Layout";
import { Button } from "@/comp/button/button";

export default function MenuSuccessPage() {
    const router = useRouter();

    return (
        <Layout.Container>
            <div className="h-32">
                <div className="h-16 flex items-center justify-end">
                    <button className="text-typography py-1">pular</button>
                </div>
            </div>
            <div className="flex flex-col">
                <Layout.Title label="Cardápio criado!" />
                <Layout.Subtitle label="Agora é só gerar os QR codes e começar a vender" />
                <div className="flex flex-col items-center">
                    <WaitersImg />
                </div>
            </div>
            <div className="pt-4">
                <Button.Primary
                    label="GERAR QR CODES"
                    onClick={() => {
                        router.push("/qrcode");
                    }}
                />
            </div>
        </Layout.Container>
    );
}
