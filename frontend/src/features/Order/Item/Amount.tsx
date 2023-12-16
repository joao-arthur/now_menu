import { Icon } from "@/components/Icon/Icon";
import styled from "styled-components";

export const Container = styled.div`
    background-color: var(--backgroundGray);
    border-radius: 7px;
    display: flex;
`;

type ButtonProps = {
    readonly selectable: boolean;
};

export const Button = styled.div<ButtonProps>`
    padding: 10px 8px;
    ${({ selectable }) => (selectable ? "cursor: pointer;" : "")}
`;

export const Content = styled.div`
    margin: 10px 8px;
`;

type Props = {
    readonly value: number;
    readonly onChange: (newValue: number) => void;
};

export function Amount({ value, onChange }: Props) {
    function clickPlus() {
        onChange(value + 1);
    }

    function clickMinus() {
        if (value < 1) return;
        onChange(value - 1);
    }

    return (
        <Container>
            <Button onClick={clickMinus} selectable={value > 0}>
                <Icon name="AiOutlineMinus" />
            </Button>
            <Content>{value}</Content>
            <Button onClick={clickPlus} selectable>
                <Icon name="AiOutlinePlus" />
            </Button>
        </Container>
    );
}
