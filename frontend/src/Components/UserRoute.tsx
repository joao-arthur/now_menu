import { ComponentType } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAppSelector } from "../hooks";

type props = {
    path: string;
    exact: true;
    component: ComponentType;
};

export function UserRoute({ exact, path, component }: props) {
    const shouldLogin = useAppSelector(
        ({ user }) => !user.logged && user.verified,
    );

    return !shouldLogin
        ? <Route exact={exact} path={path} component={component} />
        : <Redirect to="/signin" />;
}
