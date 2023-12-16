import styled from "styled-components";
import { useOrderRegisterStore } from "@/lib/order/useOrderRegisterStore";
import { Link } from "../Layout";
import { Icon as IconBase } from "../Icon/Icon";

export const Container = styled.div`
    display: flex;
    justify-content: space-around;
    bottom: 0;
    width: 100%;
    background: white;
    height: 51px;
    flex: 1 0 auto;
`;

type IconProps = {
    readonly selected: boolean;
    readonly hasColor: boolean;
};

export const Icon = styled(IconBase)<IconProps>`
    padding: 10px;
    cursor: pointer;
    ${({ selected, hasColor }) =>
    !selected
        ? (hasColor ? "fill: var(--primary);" : "fill: gray;")
        : ""}
    height: 25px;
    width: 25px;
`;

type Props = {
    readonly selected: boolean;
    readonly tableId: string;
};

export function AnonimousPageFooter({ selected, tableId }: Props) {
    const { items } = useOrderRegisterStore();

    return (
        <Container>
            <Link href={`/table/${tableId}/cart`}>
                <Icon
                    selected={selected}
                    name="MdShoppingBasket"
                    hasColor={!!items.length}
                />
            </Link>
        </Container>
    );
}
