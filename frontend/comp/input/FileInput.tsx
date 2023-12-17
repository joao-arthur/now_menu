import type {
    ChangeEventHandler,
    FocusEventHandler,
    ForwardedRef,
    ReactNode,
} from "react";
import { forwardRef } from "react";
import { cl } from "@/lib/cl";

type ForwardedProps = {
    readonly name: string;
    readonly onChange?: ChangeEventHandler<HTMLInputElement>;
    readonly onBlur?: FocusEventHandler<HTMLInputElement>;
    readonly disabled?: boolean;
    readonly required?: boolean;
    readonly max?: string | number;
    readonly maxLength?: number;
    readonly min?: string | number;
    readonly minLength?: number;
};

type Props = ForwardedProps & {
    readonly forwardedRef: ForwardedRef<HTMLInputElement | null>;
};

function FileInputComp({ forwardedRef, ...props }: Props): ReactNode {
    return (
        <input
            {...props}
            type="checkbox"
            ref={forwardedRef}
            className={cl(
                "border-none bg-gray-100 px-5 py-2 rounded-md text-sm",
            )}
        />
    );
}

export const FileInput = forwardRef<
    HTMLInputElement | null,
    ForwardedProps
>(
    (props, ref) => <FileInputComp {...props} forwardedRef={ref} />,
);
