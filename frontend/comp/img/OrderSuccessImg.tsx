import type { ReactNode } from "react";
import Image from "next/image";

export function OrderSuccessImg(): ReactNode {
    return (
        <Image
            src="/orderSuccess.svg"
            width={250}
            height={250}
            alt=""
        />
    );
}
