import { memo } from "react";
import * as Icons from "./Icons";

type Props = {
    readonly name: keyof typeof Icons;
    readonly className?: string;
    readonly onClick?: () => void;
};

export const Icon = memo(({ name, className, onClick }: Props) => {
    const SVGImage = Icons[name];

    function handleClick() {
        if (onClick) onClick();
    }

    return <SVGImage className={className} onClick={handleClick} />;
});
