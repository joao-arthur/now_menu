"use client";

import { Layout } from "@/comp/layout/Layout";
import { useParams, useRouter } from "next/navigation";

export default function OrderIdPage() {
    const order = undefined;
    const params = useParams();
    const router = useRouter();
    const id = params?.id;

    if (!order) {
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
                <Layout.Title label="Carregando pedido" />
                <div>
                    <div>
                        <span>Cliente: --------</span>
                        <span>Mesa --</span>
                    </div>
                    <div>Observação: --------</div>
                </div>
                <div>
                    <div>
                        <div>
                            <span>-----------</span>
                            <span>R$--.--</span>
                        </div>
                        <div>
                            <span>-----------</span>
                            <span>R$--.--</span>
                        </div>
                        <div>
                            <span>-----------</span>
                            <span>R$--.--</span>
                        </div>
                    </div>
                </div>
            </Layout.Container>
        );
    }
}
