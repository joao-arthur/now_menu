import ImageNext from "next/image";
import logo from "./logo.svg";

export function LogoImg() {
    return (
        <ImageNext
            src={logo}
            height={250}
            width={250}
            alt=""
        />
    );
}
