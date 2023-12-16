import styled from "styled-components";
import {
    AloneTitle,
    FlexContainer,
    FlexContent,
    Link,
    PrimaryText,
} from "@/components/Layout";
import { UserPageFooter } from "@/components/UserPageFooter/UserPageFooter";
import { useSessionStore } from "@/domains/session";

export const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    padding-top: 40px;
`;

export const Item = styled.li`
    padding: 0;
    margin: 40px 0;
    cursor: pointer;
`;

export function Profile() {
    const { setLogged } = useSessionStore();

    function signOut() {
        window.localStorage.removeItem("@NOW_MENU/user/token");
        setLogged(false);
    }

    return (
        <FlexContainer>
            <FlexContent>
                <AloneTitle>Perfil</AloneTitle>
                <List>
                    <Link to="/profile/info">
                        <Item>Informações pessoais</Item>
                    </Link>
                    <Link to="/profile/address">
                        <Item>Endereço</Item>
                    </Link>
                    <Link to="/tables/edit">
                        <Item>Mesas</Item>
                    </Link>
                    <Link to="/qrcode">
                        <Item>Visualizar QR Code</Item>
                    </Link>
                    <Item onClick={signOut}>
                        <PrimaryText>Sair</PrimaryText>
                    </Item>
                </List>
            </FlexContent>
            <UserPageFooter current="profile" />
        </FlexContainer>
    );
}
