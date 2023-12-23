"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { CollapsableList } from "@/comp/CollapsableList";
import { useMenuRegisterStore } from "@/lib/menu/useMenuRegisterStore";
import { Layout } from "@/comp/layout/Layout";
import { Button } from "@/comp/button/button";

export default function MenuRegisterPage(): ReactNode {
    const router = useRouter();
    const { addCategory, deleteItem, deleteCategory, categories } = useMenuRegisterStore();

    function handleAddCategory() {
    }

    function handleAddItem() {
    }

    return (
        <Layout.Container>
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
            <Layout.Title label="Cadastre seu cardápio" />
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
                            router.push(`/menu/${category.name}/${id}`);
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
                <Button.Primary
                    label="SALVAR CARDÁPIO"
                    onClick={() => {
                        router.push("/menu/success");
                    }}
                />
            </div>
        </Layout.Container>
    );
}
