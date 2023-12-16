import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { userActions } from "@/domains/user";
import styled from "styled-components";

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
    const dispatch = useAppDispatch();
    const [height, setHeight] = useState(window.innerHeight);

    function updateHeight() {
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        const token = window.localStorage.getItem(
            "@NOW_MENU/user/token",
        );
        dispatch(userActions.setLogged(!!token));
    }, [dispatch]);

    useEffect(() => {
        window.addEventListener("resize", updateHeight);
        return function cleanUp() {
            window.removeEventListener("resize", updateHeight);
        };
    }, []);

    return <AppContainer heightProp={height}>{children}
    </AppContainer>;
}
