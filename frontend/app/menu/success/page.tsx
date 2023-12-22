"use client";

import { useRouter } from "next/navigation";
import { WaitersImg } from "@/comp/img/WaitersImg";

export default function MenuSuccessPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col w-full h-full items-center">
            <div className="flex flex-col w-4/5 h-full">
                <div className="h-32">
                    <div className="h-16 flex items-center justify-end">
                        <button className="text-typography py-1">pular</button>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-typography text-3xl font-bold">
                        Cardápio criado!
                    </h3>
                    <h5 className="text-typography">
                        Agora é só gerar os QR codes e começar a vender
                    </h5>
                    <WaitersImg />
                </div>
                <div className="pt-4">
                    <button
                        className="w-full text-white font-bold bg-main rounded-lg cursor-pointer p-4 text-lg"
                        onClick={() => {
                            router.push("/menu/register");
                        }}
                    >
                        CADASTRAR MESAS
                    </button>
                </div>
            </div>
        </div>
    );
}
