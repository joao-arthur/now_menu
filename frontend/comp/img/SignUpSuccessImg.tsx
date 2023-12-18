import type { ReactNode } from "react";
import Image from "next/image";

export function SignUpSuccessImg(): ReactNode {
    return (
        <Image
            src="orderSuccess.svg"
            width={300}
            height={300}
            alt=""
        />
    );
}
