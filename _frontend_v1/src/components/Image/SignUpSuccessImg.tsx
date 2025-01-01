import ImageNext from "next/image";
import orderSuccess from "./orderSuccess.svg";

export function SignUpSuccessImg() {
    return (
        <ImageNext
            src={orderSuccess}
            height={300}
            width={300}
            alt=""
        />
    );
}
