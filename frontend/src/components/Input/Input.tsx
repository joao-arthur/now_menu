import styled from "styled-components";
import InputMask from "react-input-mask";
import { MoneyInput } from "../MoneyInput";


export const CustomInput = styled.input`
    border: none;
    background-color: whitesmoke;
    padding: 8px 20px;
    border-radius: 5px;
`;

export const TextArea = styled.textarea`
    border: none;
    background-color: whitesmoke;
    padding: 8px 20px;
    border-radius: 5px;
    resize: none;
    font-family: inherit;
    font-size: 0.8rem;
    height: 100px;
`;

export type Props = {
    readonly type: string;
    readonly name: string;
    readonly placeholder?: string;
    readonly required?: boolean;
    readonly disabled?: boolean;
    readonly value?: string | number | readonly string[] | undefined;
    readonly onChange?: (newValue: string) => void;
    readonly min?: number;
    readonly max?: number;
    readonly className?: string;
    readonly mask?: string;
};

export function Input({
    type,
    placeholder,
    name,
    required,
    value,
    onChange,
    disabled,
    min,
    max,
    className,
    mask,
}: Props) {
    if (type === "money") {
        return (
            <MoneyInput
                name={name}
                value={value as string}
                onChange={onChange as any}
            />
        );
    }

    if (type === "mask") {
        return (
            <InputMask
                mask={mask as string}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
            >
                {() => <CustomInput type="tel" />}
            </InputMask>
        );
    }

    if (type === "textarea") {
        return (
            <TextArea
                name={name}
                required={required}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
                className={className}
            />
        );
    }

    return (
        <CustomInput
            type={type}
            placeholder={placeholder}
            name={name}
            required={required}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            min={min}
            max={max}
            disabled={disabled}
            className={className}
        />
    );
}
