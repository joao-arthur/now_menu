import { CustomInput } from "./Input/Input";

type Props = {
    readonly name: string;
    readonly value: string | undefined;
    readonly onChange: (newValue: string) => void;
};

export function MoneyInput({ name, value, onChange }: Props) {
    function handleChange(newValue: string) {
        const treatedNewValue = newValue.slice(3);
        if (/[^0-9|^,]/.test(treatedNewValue)) return;
        if (treatedNewValue === ",") return;
        if (
            treatedNewValue.indexOf(",") !==
                treatedNewValue.lastIndexOf(",")
        ) {
            return;
        }
        if (treatedNewValue.split(",")[1]?.length > 2) return;
        onChange(treatedNewValue);
    }

    return (
        <CustomInput
            type="text"
            name={name}
            required
            onChange={(e) => handleChange(e.target.value)}
            value={"R$ " + value}
        />
    );
}
