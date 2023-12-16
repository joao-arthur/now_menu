import type { ReactNode } from "react";

type Props = {
    readonly children: ReactNode;
};

export function Subtitle({ children }: Props) {
    return <h5>{children}</h5>;
}
