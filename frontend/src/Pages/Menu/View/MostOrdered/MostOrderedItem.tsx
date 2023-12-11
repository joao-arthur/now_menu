import { useGetMockedImage } from "../../../../Api/image.api";
import { useEffect, useState } from "react";
import { Item } from "./MostOrdered.styles";

export function MostOrderedItem() {
    const [imageURL, setImageURL] = useState("");
    const { data, mutate } = useGetMockedImage();

    useEffect(() => {
        mutate();
    }, []);

    useEffect(() => {
        if (data?.image) setImageURL(data.image);
    }, [data]);

    return <Item src={imageURL} />;
}
