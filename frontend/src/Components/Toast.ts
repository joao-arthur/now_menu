import toast from 'react-hot-toast';

type messages<T> = {
    loading: string;
    error: string | ((res: T) => string);
    success: string | ((res: T) => string);
};

export function Toast<T>(promise: Promise<T>, messages: messages<T>) {
    return toast.promise(promise, messages, {
        style: {
            minWidth: '250px'
        }
    });
}
