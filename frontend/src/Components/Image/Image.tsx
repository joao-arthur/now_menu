import { memo } from "react";
import { Images } from "./Images";
import { IMG } from "./Image.styles";

type names = keyof typeof Images;

type props = {
    name: names;
    width?: number;
    height?: number;
};

export const Image = memo(({ name, height, width }: props) => {
    const selectedImage = Images[name];

    return (
        <IMG
            src={selectedImage}
            height={height}
            width={width}
            alt=""
        />
    );
});
