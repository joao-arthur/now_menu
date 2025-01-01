import type { ChangeEventHandler, FocusEventHandler, ForwardedRef, ReactNode } from "react";
import { forwardRef } from "react";
import { cl } from "@/lib/cl";

type ForwardedProps = {
    readonly name: string;
    readonly onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    readonly onBlur?: FocusEventHandler<HTMLTextAreaElement>;
    readonly disabled?: boolean;
    readonly required?: boolean;
    readonly max?: string | number;
    readonly maxLength?: number;
    readonly min?: string | number;
    readonly minLength?: number;
};

type Props = ForwardedProps & {
    readonly forwardedRef: ForwardedRef<HTMLTextAreaElement | null>;
};

function TextAreaInputComp({ forwardedRef, ...props }: Props): ReactNode {
    return (
        <textarea
            {...props}
            ref={forwardedRef}
            className={cl(
                "border-none bg-gray-100 px-5 py-2 rounded-md h-24 resize-none text-sm",
            )}
        />
    );
}

export const TextAreaInput = forwardRef<
    HTMLTextAreaElement | null,
    ForwardedProps
>(
    (props, ref) => <TextAreaInputComp {...props} forwardedRef={ref} />,
);
