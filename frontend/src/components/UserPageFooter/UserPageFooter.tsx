import { Link } from "../Layout";
import styled from "styled-components";
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
    readonly current: boolean;
};

export const Icon = styled(IconBase)<IconProps>`
    padding: 10px;
    cursor: pointer;
    ${({ current }) => (!current ? "fill: gray;" : "")}
    height: 25px;
    width: 25px;
`;


type Props = {
    readonly current?: "orders" | "menu" | "profile";
};

export function UserPageFooter({ current }: Props) {
    return (
        <Container>
            {current === "orders"
                ? <Icon current name="FaClipboardList" />
                : (
                    <Link to="/orders">
                        <Icon
                            current={false}
                            name="FaClipboardList"
                        />
                    </Link>
                )}
            {current === "menu"
                ? <Icon current name="GiKnifeFork" />
                : (
                    <Link to="/menu">
                        <Icon current={false} name="GiKnifeFork" />
                    </Link>
                )}
            {current === "profile"
                ? <Icon current name="MdStore" />
                : (
                    <Link to="/profile">
                        <Icon current={false} name="MdStore" />
                    </Link>
                )}
        </Container>
    );
}
