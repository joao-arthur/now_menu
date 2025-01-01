import { ReactNode } from "react";
import { Input, Props as InputProps } from "../Input/Input";
import styled from "styled-components";

type Props = {
    title: string;
    observation?: ReactNode;
    className?: string;
} & InputProps;

export function Field(
    { title, observation, className, ...inputProps }: Props,
) {
    return (
        <div className="flex flex-col">
            <span>{title}</span>
            <Input {...inputProps} />
            {observation
                ? <div className="flex justify-end">{observation}</div>
                : null}
        </div>
    );
}
