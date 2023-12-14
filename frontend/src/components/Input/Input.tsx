import { CustomInput, TextArea } from "./Input.styles";
import InputMask from "react-input-mask";
import { MoneyInput } from "../MoneyInput";

export type props = {
    type: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    value?: string | number | readonly string[] | undefined;
    onChange?: (newValue: string) => void;
    min?: number;
    max?: number;
    className?: string;
    mask?: string;
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
}: props) {
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
