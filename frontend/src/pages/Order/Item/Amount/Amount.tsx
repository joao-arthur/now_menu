import { Icon } from "../../../../Components/Icon/Icon";
import { Button, Container, Content } from "./Amount.styles";

type props = {
    value: number;
    onChange: (newValue: number) => void;
};

export function Amount({ value, onChange }: props) {
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
