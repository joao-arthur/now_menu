import { ComponentType } from "react";
import { redirect, Route } from "react-router-dom";
import { useAppSelector } from "../hooks";

type Props = {
    readonly path: string;
    readonly exact: true;
    readonly component: ComponentType;
};

export function UserRoute({ exact, path, component }: Props) {
    const shouldLogin = useAppSelector(
        ({ user }) => !user.logged && user.verified,
    );
    if (shouldLogin) {
        redirect("/signin");
    }
    return <Route exact={exact} path={path} component={component} />;
}
