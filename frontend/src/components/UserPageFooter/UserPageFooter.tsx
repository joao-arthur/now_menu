import { Link } from "../Layout";
import { Container, Icon } from "./UserPageFooter.styles";

type props = {
    current?: "orders" | "menu" | "profile";
};

export function UserPageFooter({ current }: props) {
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
