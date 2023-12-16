import { FormEvent, ReactNode } from "react";
import styled from "styled-components";

export const CustomForm = styled.form`
    display: flex;
    flex-direction: column;
`;

type Props = {
    readonly children: ReactNode | ReactNode[];
    readonly onSubmit: () => void;
};

export function Form({ children, onSubmit }: Props) {
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onSubmit();
    }

    return <CustomForm onSubmit={handleSubmit}>{children}
    </CustomForm>;
}
