import { ReactChild } from "react";
import { Input, props as InputProps } from "../Input/Input";
import { Container, Observation, Title } from "./Field.styles";
export { Title as FieldTitle } from "./Field.styles";

type props = {
    title: string;
    observation?: ReactChild;
    className?: string;
} & InputProps;

export function Field(
    { title, observation, className, ...inputProps }: props,
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
