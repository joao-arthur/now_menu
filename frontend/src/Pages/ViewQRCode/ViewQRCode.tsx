import { decodeJWT } from '../../Core/DecodeJWT';
import { UserPageFooter } from '../../Components/UserPageFooter/UserPageFooter';
import { Iframe } from './ViewQRCode.styles';
import { FlexContainer, FlexContentMax } from '../../Components/Layout';

export function ViewQRCode() {
    let userId = '';
    try {
        userId = decodeJWT(
            JSON.parse(
                window.localStorage.getItem('@NOW_MENU/user/token') as string
            ).token
        ).id;
    } catch (e) {
        return null;
    }
    if (!userId) return null;

    const baseURL = `${import.meta.env.VITE_BACKEND_URL}/table/qrcode`;
    const origin = window.location.origin;
    const params = new URLSearchParams({ userId, origin }).toString();

    return (
        <FlexContainer>
            <FlexContentMax>
                <Iframe title='viewqrcodes' src={`${baseURL}?${params}`} />
            </FlexContentMax>
            <UserPageFooter />
        </FlexContainer>
    );
}
