import type { JSX, ReactNode } from "react";

type Props = {
    readonly children: ReactNode;
};

export function FieldContainer({ children }: Props): JSX.Element {
    return (
        <div className="flex flex-col py-2">
            {children}
        </div>
    );
}
