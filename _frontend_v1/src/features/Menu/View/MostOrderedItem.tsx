import { useGetMockedImage } from "@/api/imageAPI";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const Item = styled.img`
    height: 140px;
    width: 120px;
    margin: 0 10px;
    border-radius: 7px;
    object-fit: cover;
`;

export function MostOrderedItem() {
    const { data, mutate } = useGetMockedImage();
    const [imageURL, setImageURL] = useState("");

    useEffect(() => {
        mutate();
    }, []);

    useEffect(() => {
        if (data?.image) setImageURL(data.image);
    }, [data]);

    return <Item src={imageURL} />;
}
