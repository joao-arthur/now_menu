import { useSessionStore } from "@/domains/session";
import { ComponentType } from "react";
import { redirect, Route } from "react-router-dom";

type Props = {
    readonly path: string;
    readonly component: ComponentType;
    readonly exact: true;
};

export function AnonimousRoute({ path, component, exact }: Props) {
    const { session } = useSessionStore();

    const logged = session.logged;
    if (logged) {
        redirect("/orders");
    }

    return <Route exact={exact} path={path} component={component} />;
}
