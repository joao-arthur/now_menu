import { useSessionStore } from "@/domains/session";
import { ComponentType } from "react";
import { redirect, Route } from "react-router-dom";

type Props = {
    readonly path: string;
    readonly exact: true;
    readonly component: ComponentType;
};

export function UserRoute({ exact, path, component }: Props) {
    const { session } = useSessionStore();

    const shouldLogin = !session.logged && session.verified;

    if (shouldLogin) {
        redirect("/signin");
    }

    return <Route exact={exact} path={path} component={component} />;
}
