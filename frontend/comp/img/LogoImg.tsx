import type { ReactNode } from "react";
import Image from "next/image";

export function LogoImg(): ReactNode {
    return (
        <Image
            src="/logo.svg"
            width={200}
            height={200}
            alt=""
        />
    );
}
