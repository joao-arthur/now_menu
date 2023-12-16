import { ComponentType } from "react";
import { redirect, Route } from "react-router-dom";
import { useAppSelector } from "../hooks";

type Props = {
    readonly path: string;
    readonly component: ComponentType;
    readonly exact: true;
};

export function AnonimousRoute({ path, component, exact }: Props) {
    const logged = useAppSelector(({ user }) => user.logged);
    if (logged) {
        redirect("/orders");
    }
    return <Route exact={exact} path={path} component={component} />;
}
