import { ComponentType } from "react";
import { redirect, Route } from "react-router-dom";
import { useAppSelector } from "../hooks";

type props = {
    path: string;
    component: ComponentType;
    exact: true;
};

export function AnonimousRoute({ path, component, exact }: props) {
    const logged = useAppSelector(({ user }) => user.logged);
    if (logged) {
        redirect("/orders");
    }
    return <Route exact={exact} path={path} component={component} />;
}
