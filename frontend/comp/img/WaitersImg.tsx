import type { ReactNode } from "react";
import Image from "next/image";

export function WaitersImg(): ReactNode {
    return (
        <Image
            src="/waiters.svg"
            width={500}
            height={500}
            alt=""
        />
    );
}
