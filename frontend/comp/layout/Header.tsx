import { useRouter } from "next/navigation";
import type { JSX } from "react";

type Props = {
    readonly left?: {
        readonly label: string;
        readonly href: string;
    };
    readonly right?: {
        readonly label: string;
        readonly href: string;
    };
};

export function Header({ left, right }: Props): JSX.Element {
    const router = useRouter();

    return (
        <div className="h-32">
            <div className="h-16 flex items-center justify-between">
                <div>
                    {left
                        ? (
                            <button
                                className="text-typography py-1"
                                onClick={() => {
                                    router.push(left.href);
                                }}
                            >
                                {left.label}
                            </button>
                        )
                        : null}
                </div>
                <div>
                    {right
                        ? (
                            <button
                                className="text-typography py-1"
                                onClick={() => {
                                    router.push(right.href);
                                }}
                            >
                                {right.label}
                            </button>
                        )
                        : null}
                </div>
            </div>
        </div>
    );
}
