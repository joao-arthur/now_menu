import { ReactChild } from 'react';
import { Container, Input, Text } from './Checkbox.styles';

type props = {
    children: ReactChild | ReactChild[];
    value: boolean;
    onChange: (newValue: boolean) => void;
    disabled?: boolean;
};

export function Checkbox({ children, value, onChange, disabled }: props) {
    return (
        <Container>
            <Input
                type='checkbox'
                value={String(value)}
                onChange={e => onChange(e.target.checked)}
                disabled={disabled}
            />
            <Text>{children}</Text>
        </Container>
    );
}
