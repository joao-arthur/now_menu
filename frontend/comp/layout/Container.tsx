'use client';

import type { ReactNode } from "react";

type Props = {
    readonly children: ReactNode;
}

export function Container({children}:Props): ReactNode {
    return (
        <div className="flex flex-col w-full h-full">
            {children}
        </div>
    )
}