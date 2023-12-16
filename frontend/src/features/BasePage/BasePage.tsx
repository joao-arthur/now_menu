import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { useSessionStore } from "@/domains/session";

type ContainerProps = {
    readonly heightProp: number;
};

export const AppContainer = styled.div<ContainerProps>`
    ${({ heightProp }) => `height: ${heightProp}px;`};
    display: flex;
`;

type Props = {
    readonly children: ReactNode;
};

export function BasePage({ children }: Props) {
    const { setLogged } = useSessionStore();

    const [height, setHeight] = useState(window.innerHeight);

    function updateHeight() {
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        const token = window.localStorage.getItem(
            "@NOW_MENU/user/token",
        );
        setLogged(!!token);
    }, []);

    useEffect(() => {
        window.addEventListener("resize", updateHeight);
        return function cleanUp() {
            window.removeEventListener("resize", updateHeight);
        };
    }, []);

    return <AppContainer heightProp={height}>{children}
    </AppContainer>;
}
