import { CheckboxInput } from "./CheckboxInput";
import { DateInput } from "./DateInput";
import { EmailInput } from "./EmailInput";
import { FileInput } from "./FileInput";
import { NumberInput } from "./NumberInput";
import { PasswordInput } from "./PasswordInput";
import { SearchInput } from "./SearchInput";
import { TelephoneInput } from "./TelephoneInput";
import { TextAreaInput } from "./TextAreaInput";
import { TextInput } from "./TextInput";
import { TimeInput } from "./TimeInput";

export const Input = {
    Checkbox: CheckboxInput,
    Date: DateInput,
    Email: EmailInput,
    File: FileInput,
    Number: NumberInput,
    Password: PasswordInput,
    Search: SearchInput,
    Telephone: TelephoneInput,
    TextArea: TextAreaInput,
    Text: TextInput,
    Time: TimeInput,
} as const;
