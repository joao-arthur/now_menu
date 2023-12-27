import { Icon } from "./icon/Icon";
import { AppLink } from "./AppLink";

type Props = {
    readonly current: "orders" | "menu" | "profile" | undefined;
};

export function UserFooter({ current }: Props) {
    return (
        <footer className="w-full h-8 flex flex-row justify-around bottom-0">
            {current === "orders"
                ? <Icon name="clipboard" onClick={() => {}} />
                : (
                    <AppLink href="/orders">
                        <Icon name="clipboard" onClick={() => {}} />
                    </AppLink>
                )}
            {current === "menu"
                ? <Icon name="fork-and-knife" onClick={() => {}} />
                : (
                    <AppLink href="/menu">
                        <Icon name="fork-and-knife" onClick={() => {}} />
                    </AppLink>
                )}
            {current === "profile"
                ? <Icon name="store" onClick={() => {}} />
                : (
                    <AppLink href="/profile">
                        <Icon name="store" onClick={() => {}} />
                    </AppLink>
                )}
        </footer>
    );
}
