"use client";

import styled from "styled-components";
import { useSessionStore } from "@/lib/session/useSessionStore";
import {
    AloneTitle,
    FlexContainer,
    FlexContent,
    Link,
    PrimaryText,
} from "@/components/Layout";
import { UserPageFooter } from "@/components/UserPageFooter/UserPageFooter";

 const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    padding-top: 40px;
`;

 const Item = styled.li`
    padding: 0;
    margin: 40px 0;
    cursor: pointer;
`;

export default function ProfilePage() {
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
                    <Link href="/profile/info">
                        <Item>Informações pessoais</Item>
                    </Link>
                    <Link href="/profile/address">
                        <Item>Endereço</Item>
                    </Link>
                    <Link href="/tables/edit">
                        <Item>Mesas</Item>
                    </Link>
                    <Link href="/qrcode">
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
