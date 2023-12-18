import type { ReactNode } from "react";

type Props = {
    readonly children: ReactNode;
};

export function Title({ children }: Props): ReactNode {
    return <h3>{children}</h3>;
}
