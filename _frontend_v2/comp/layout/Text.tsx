import type { ReactNode } from "react";

type Props = {
    readonly children: ReactNode;
};

export function Text({ children }: Props): ReactNode {
    return <span>{children}</span>;
}
