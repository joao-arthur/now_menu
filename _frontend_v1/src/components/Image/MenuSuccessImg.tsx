import ImageNext from "next/image";
import menuSuccess from "./menuSuccess.svg";

export function MenuSuccessImg() {
    return (
        <ImageNext
            src={menuSuccess}
            height={250}
            width={250}
            alt=""
        />
    );
}
