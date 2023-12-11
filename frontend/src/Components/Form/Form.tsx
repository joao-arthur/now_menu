import { ReactChild, FormEvent } from 'react';
import { CustomForm } from './Form.styles';

type props = {
    children: ReactChild | ReactChild[];
    onSubmit: () => void;
};

export function Form({ children, onSubmit }: props) {
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onSubmit();
    }

    return <CustomForm onSubmit={handleSubmit}>{children}</CustomForm>;
}
