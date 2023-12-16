"use client";

import { decodeJWT } from "@/core/decodeJWT";
import { UserPageFooter } from "@/components/UserPageFooter/UserPageFooter";
import { FlexContainer, FlexContentMax } from "@/components/Layout";
import styled from "styled-components";

 const Iframe = styled.iframe`
    width: 100%;
    height: 100vh;
    border: none;
`;

export default function QRCodePage() {
    let userId = "";
    try {
        userId = decodeJWT(
            JSON.parse(
                window.localStorage.getItem(
                    "@NOW_MENU/user/token",
                ) as string,
            ).token,
        ).id;
    } catch (e) {
        return null;
    }
    if (!userId) return null;

    const baseURL = `http://localhost:8080/table/qrcode`;
    const origin = window.location.origin;
    const params = new URLSearchParams({ userId, origin }).toString();

    return (
        <FlexContainer>
            <FlexContentMax>
                <Iframe
                    title="viewqrcodes"
                    src={`${baseURL}?${params}`}
                />
            </FlexContentMax>
            <UserPageFooter />
        </FlexContainer>
    );
}
