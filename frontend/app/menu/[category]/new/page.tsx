"use client";

import { useParams, useRouter } from "next/navigation";
import { useMenuRegisterStore } from "@/lib/menu/useMenuRegisterStore";
import { menuItemRegisterSchema } from "@/lib/menu/menuItemRegisterSchema";
import { MenuItemRegister } from "@/lib/menu/menuItemRegister";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/comp/input/Input";
import { Layout } from "@/comp/layout/Layout";
import { Form } from "@/comp/form/form";
import { Button } from "@/comp/button/button";

export default function MenuCategoryNewPage() {
    const router = useRouter();
    const category = useParams().category as string;

    const { addItem } = useMenuRegisterStore();
    const { register, handleSubmit } = useForm<MenuItemRegister>({
        resolver: zodResolver(menuItemRegisterSchema),
    });

    function handleOnSubmit(form: MenuItemRegister) {
        const item = {
            name: form.name,
            description: form.description,
            prepareTime: form.prepareHours * 3600 + form.prepareMinutes * 60 + form.prepareSeconds,
            price: Number(form.price.replace(".", ",")),
        };
        addItem(item, category);
        router.back();
    }

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
            <Layout.Title label="Adicionar produto" />
            <div className="py-2">
                <Form.Container onSubmit={handleSubmit(handleOnSubmit)}>
                    <Form.FieldContainer>
                        <Form.FieldTitle label="Nome" />
                        <Input.Text {...register("name")} />
                    </Form.FieldContainer>
                    <Form.FieldContainer>
                        <Form.FieldTitle label="Descricão" />
                        <Input.Text {...register("description")} />
                    </Form.FieldContainer>
                    <Form.FieldContainer>
                        <Form.FieldTitle label="Tempo estimado de preparo" />
                        <div className="flex flex-row w-full gap-x-2">
                            <Input.Number
                                {...register("prepareHours", { valueAsNumber: true })}
                            />
                            <Input.Number
                                {...register("prepareMinutes", { valueAsNumber: true })}
                            />
                            <Input.Number
                                {...register("prepareSeconds", { valueAsNumber: true })}
                            />
                        </div>
                    </Form.FieldContainer>
                    <Form.FieldContainer>
                        <Form.FieldTitle label="Preço" />
                        <Input.Number {...register("price")} />
                    </Form.FieldContainer>
                    <Form.FieldContainer>
                        <Form.FieldTitle label="Foto do produto" />
                        <Input.File />
                    </Form.FieldContainer>
                    <div className="pt-4">
                        <Button.Submit label="ADICIONAR" />
                    </div>
                </Form.Container>
            </div>
        </Layout.Container>
    );
}
