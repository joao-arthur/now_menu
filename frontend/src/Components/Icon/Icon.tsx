import { memo } from "react";
import * as Icons from "./Icons";

type names = keyof typeof Icons;

type props = {
    name: names;
    className?: string;
    onClick?: () => void;
};

export const Icon = memo(({ name, className, onClick }: props) => {
    const SVGImage = Icons[name];

    function handleClick() {
        if (onClick) onClick();
    }

    return <SVGImage className={className} onClick={handleClick} />;
});
