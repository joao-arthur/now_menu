import Image from "next/image";

export function LogoImg() {
    return (
        <Image
            src="/logo.svg"
            height={250}
            width={250}
            alt=""
        />
    );
}
