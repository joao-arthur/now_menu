import type { ReactNode } from "react";
import Image from "next/image";

export function ChefCookImg(): ReactNode {
    return (
        <Image
            src="/chefCook.svg"
            width={250}
            height={250}
            alt=""
        />
    );
}
