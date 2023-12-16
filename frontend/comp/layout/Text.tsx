import type { ReactNode } from "react";

type Props = {
    readonly children: ReactNode;
};

export function Text({ children }: Props) {
    return <span>{children}</span>;
}
