import Link from "next/link";
import type { JSX, ReactNode } from "react";

type Props = {
    readonly href: string;
    readonly children: ReactNode;
};

export function AppLink({ href, children }: Props): JSX.Element {
    return <Link href={href}>{children}</Link>;
}
