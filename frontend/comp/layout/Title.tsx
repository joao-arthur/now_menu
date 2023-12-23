import type { ReactNode } from "react";

type Props = {
    readonly label: string;
};

export function Title({ label }: Props): ReactNode {
    return (
        <h3 className="text-typography text-3xl font-bold">
            {label}
        </h3>
    );
}
