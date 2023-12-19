"use client";

import { useRouter } from "next/navigation";
import { ChefTasteImg } from "@/comp/img/ChefTasteImg";

export default function SignUpSuccessPage() {
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
                        Conta criada!
                    </h3>
                    <h5 className="text-typography">
                        Agora vamos cadastrar o seu cardápio
                    </h5>
                    <ChefTasteImg />
                </div>
                <div className="pt-4">
                    <button className="w-full text-white font-bold bg-main rounded-lg cursor-pointer p-4 text-lg">
                        Cadastrar cardápio
                    </button>
                </div>
            </div>
        </div>
    );
}
