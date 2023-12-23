import type { FormEvent, JSX, ReactNode } from "react";

type Props = {
    readonly children: ReactNode;
    readonly onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export function Container({ children, onSubmit }: Props): JSX.Element {
    return (
        <form
            className="flex flex-col"
            onSubmit={onSubmit}
        >
            {children}
        </form>
    );
}
