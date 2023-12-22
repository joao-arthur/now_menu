"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { CollapsableList } from "@/comp/CollapsableList";
import { useMenuRegisterStore } from "@/lib/menu/useMenuRegisterStore";

export default function MenuRegisterPage(): ReactNode {
    const router = useRouter();
    const { addCategory, deleteItem, deleteCategory, categories } = useMenuRegisterStore();

    function handleAddCategory() {
    }

    function handleAddItem() {
    }

    return (
        <div className="flex flex-col w-full h-full items-center">
            <div className="flex flex-col w-4/5 h-full">
                <div className="h-32">
                    <div className="h-16 flex items-center justify-end">
                        <button
                            className="text-typography py-1"
                            onClick={() => {
                                router.push("");
                            }}
                        >
                            pular
                        </button>
                    </div>
                </div>
                <h3 className="text-typography text-3xl font-bold">
                    Cadastre seu cardápio
                </h3>
                {categories.map((category) => (
                    <div className="py-2" key={category.name}>
                        <CollapsableList
                            name={category.name}
                            items={category.items.map((item) => ({
                                name: item.name,
                                value: (item.price / 100).toLocaleString(
                                    undefined,
                                    {
                                        style: "currency",
                                        currency: "BRL",
                                    },
                                ),
                                id: item.id,
                            }))}
                            addMessage="Adicionar produto"
                            onDeleteItem={() => {}}
                            onAddClick={() => {
                                router.push(`/menu/${category.name}/new`);
                            }}
                            onEditItem={(id) => {
                                router.push(`/menu/edit/${id}`);
                            }}
                        />
                    </div>
                ))}
                <div className="flex flex-col rounded-lg bg-gray-100">
                    <div className="text-center py-2">
                        <button
                            onClick={() => {}}
                            className="bg"
                        >
                            Adicionar categoria
                        </button>
                    </div>
                </div>
                <div className="pt-4">
                    <button
                        className="w-full text-white font-bold bg-main rounded-lg cursor-pointer p-4 text-lg"
                        onClick={() => {
                            router.push("/menu/success");
                        }}
                    >
                        SALVAR CARDÁPIO
                    </button>
                </div>
            </div>
        </div>
    );
}
