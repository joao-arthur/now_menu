import { memo } from "react";
import { Images } from "./Images";
import styled from "styled-components";

export const IMG = styled.img`
    margin-left: auto;
    margin-right: auto;
    max-width: 400px;
`;

type Props = {
    readonly name: keyof typeof Images;
    readonly width?: number;
    readonly height?: number;
};

export const Image = memo(({ name, height, width }: Props) => {
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
