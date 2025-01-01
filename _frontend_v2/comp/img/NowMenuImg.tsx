import type { ReactNode } from "react";
import Image from "next/image";

export function NowMenuImg(): ReactNode {
    return (
        <Image
            src="/nowMenu.svg"
            width={200}
            height={200}
            alt=""
        />
    );
}
