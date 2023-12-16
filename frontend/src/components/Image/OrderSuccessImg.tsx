import ImageNext from "next/image";
import orderSuccess from "./orderSuccess.svg";

export function OrderSuccessImg() {
    return (
        <ImageNext
            src={orderSuccess}
            height={250}
            width={250}
            alt=""
        />
    );
}
