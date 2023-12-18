import type { ReactNode } from "react";

type Props = {
    readonly children: ReactNode;
};

export function Subtitle({ children }: Props): ReactNode {
    return <h5>{children}</h5>;
}
