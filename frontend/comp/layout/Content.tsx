'use client';

import type { ReactNode } from "react";

type Props = {
    readonly children: ReactNode;
}

export function Content({children}:Props): ReactNode {
    return (
        <div className="flex flex-row w-full h-full overflow-auto bg-blue">
            {children}
        </div>
    )
}