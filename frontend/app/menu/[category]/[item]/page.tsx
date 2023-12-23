"use client";

import { useParams, useRouter } from "next/navigation";
import { useMenuRegisterStore } from "@/lib/menu/useMenuRegisterStore";
import { menuItemRegisterSchema } from "@/lib/menu/menuItemRegisterSchema";
import { MenuItemRegister } from "@/lib/menu/menuItemRegister";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/comp/input/Input";

export default function MenuCategoryItemEditPage() {
    const router = useRouter();
    const category = useParams().category as string;
    const itemId = useParams().item as string;

    const { editItem, categories } = useMenuRegisterStore();

    const foundItem = categories.flatMap((c) => c.items).find((
        catItem,
    ) => (catItem.id === itemId))!;

    const tot = Number(foundItem.prepareTime);

    const hours = Math.floor(tot / 3600);
    const minutes = Math.floor((tot - hours * 3600) / 60);
    const seconds = tot - (hours * 3600) - (minutes * 60);

    const { register, handleSubmit } = useForm<MenuItemRegister>({
        resolver: zodResolver(menuItemRegisterSchema),
        values: {
            name: foundItem.name,
            description: foundItem.description,
            prepareHours: hours,
            prepareMinutes: minutes,
            prepareSeconds: seconds,
            price: foundItem.price,
        },
    });

    function handleOnSubmit(form: MenuItemRegister) {
        const item = {
            name: form.name,
            description: form.description,
            prepareTime: form.prepareHours * 3600 + form.prepareMinutes * 60 + form.prepareSeconds,
            price: Number(form.price.replace(".", ",")),
        };
        editItem({ ...item, id: itemId });
        router.back();
    }

    return (
        <div className="flex flex-col w-full h-full items-center">
            <div className="flex flex-col w-4/5 h-full">
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
                <h3 className="text-typography text-3xl font-bold">
                    Editar produto
                </h3>
                <h5 className="text-typography">
                    Preencha para continuar
                </h5>
                <div className="py-2">
                    <form
                        className="flex flex-col"
                        onSubmit={handleSubmit(handleOnSubmit)}
                    >
                        <div className="flex flex-col py-2">
                            <span className="text-typography text-sm">
                                Nome
                            </span>
                            <Input.Text {...register("name")} />
                        </div>
                        <div className="flex flex-col py-2">
                            <span className="text-typography text-sm">
                                Descricão
                            </span>
                            <Input.Text {...register("description")} />
                        </div>
                        <div className="flex flex-col py-2">
                            <span className="text-typography text-sm">
                                Tempo estimado de preparo
                            </span>
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
                        </div>
                        <div className="flex flex-col py-2">
                            <span className="text-typography text-sm">
                                Preço
                            </span>
                            <Input.Number {...register("price")} />
                        </div>
                        <div className="flex flex-col py-2">
                            <span className="text-typography text-sm">
                                Foto do produto
                            </span>
                            <Input.File />
                        </div>
                        <div className="pt-4">
                            <button className="w-full text-white font-bold bg-main rounded-lg cursor-pointer p-4 text-lg">
                                ADICIONAR
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
