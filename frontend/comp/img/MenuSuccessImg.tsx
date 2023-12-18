import type { ReactNode } from "react";
import Image from "next/image";

export function MenuSuccessImg(): ReactNode {
    return (
        <Image
            src="/menuSuccess.svg"
            width={250}
            height={250}
            alt=""
        />
    );
}
