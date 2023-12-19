import type { ReactNode } from "react";
import Image from "next/image";

export function WaitersImg(): ReactNode {
    return (
        <Image
            src="/waiters.svg"
            width={300}
            height={300}
            alt=""
        />
    );
}
