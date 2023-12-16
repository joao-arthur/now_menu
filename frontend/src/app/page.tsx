"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useWindowSize } from "@uidotdev/usehooks";
import { useSessionStore } from "@/domains/session";

type ContainerProps = {
    readonly heightProp: number | null;
};

export const AppContainer = styled.div<ContainerProps>`
    ${({ heightProp }) => `height: ${heightProp}px;`};
    display: flex;
`;

type Props = {
    readonly children: ReactNode;
};

export default function AppPage({ children }: Props) {
    const router = useRouter();
    const { session, setLogged } = useSessionStore();
    const windowSize = useWindowSize();

    useEffect(() => {
        const token = window.localStorage.getItem(
            "@NOW_MENU/user/token",
        );
        setLogged(!!token);
    }, []);

    useEffect(() => {
        if (!session.logged && session.verified) {
            router.push("/signin");
        }
        if (session.logged) {
            router.push("/menu");
        }
    }, []);

    return (
        <AppContainer heightProp={windowSize.height}>
            {children}
        </AppContainer>
    );
}
