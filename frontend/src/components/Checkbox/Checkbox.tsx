import { ReactNode } from "react";
import styled from "styled-components";

export const Input = styled.input`
    cursor: pointer;
`;

export const Container = styled.div`
    margin-top: 20px;
    margin-bottom: 10px;
`;

export const Text = styled.span`
    font-size: 0.9rem;
`;

type Props = {
    readonly children: ReactNode | ReactNode[];
    readonly value: boolean;
    readonly onChange: (newValue: boolean) => void;
    readonly disabled?: boolean;
};

export function Checkbox(
    { children, value, onChange, disabled }: Props,
) {
    return (
        <Container>
            <Input
                type="checkbox"
                value={String(value)}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
            />
            <Text>{children}</Text>
        </Container>
    );
}
