import toast from "react-hot-toast";

type Messages<T> = {
    readonly loading: string;
    readonly error: string | ((res: T) => string);
    readonly success: string | ((res: T) => string);
};

export function Toast<T>(promise: Promise<T>, messages: Messages<T>) {
    return toast.promise(promise, messages, {
        style: {
            minWidth: "250px",
        },
    });
}
