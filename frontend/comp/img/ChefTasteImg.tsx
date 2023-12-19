import type { ReactNode } from "react";
import Image from "next/image";

export function ChefTasteImg(): ReactNode {
    return (
        <Image
            src="/chefTaste.svg"
            width={250}
            height={250}
            alt=""
        />
    );
}
