import type { ReactNode } from "react";

type Props = {
    readonly label: string;
};

export function Subtitle({ label }: Props): ReactNode {
    return <h5 className="text-typography">{label}</h5>;
}
