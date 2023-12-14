import { useAppDispatch } from "../../hooks";
import {
    AloneTitle,
    FlexContainer,
    FlexContent,
    Link,
    PrimaryText,
} from "../../Components/Layout";
import { userActions } from "../../Domains/user";
import { UserPageFooter } from "../../Components/UserPageFooter/UserPageFooter";
import { Item, List } from "./Profile.styles";

export function Profile() {
    const dispatch = useAppDispatch();

    function signOut() {
        window.localStorage.removeItem("@NOW_MENU/user/token");
        dispatch(userActions.setLogged(false));
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
