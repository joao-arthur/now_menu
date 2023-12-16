import { ReactNode } from "react";
import { Input, props as InputProps } from "../Input/Input";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 8px 0;
`;

export const Title = styled.span`
    font-size: 0.8rem;
`;

export const Observation = styled.div`
    display: flex;
    justify-content: end;
    margin-top: 5px;
`;

type Props = {
    title: string;
    observation?: ReactNode;
    className?: string;
} & InputProps;

export function Field(
    { title, observation, className, ...inputProps }: Props,
) {
    return (
        <Container className={className}>
            <Title>{title}</Title>
            <Input {...inputProps} />
            {observation
                ? <Observation>{observation}</Observation>
                : null}
        </Container>
    );
}
