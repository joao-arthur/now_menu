import { Icon } from "./icon/Icon";
import { AppLink } from "./AppLink";

type Props = {
    readonly selected: boolean;
    readonly tableId: string;
};

export function AnonimousPageFooter({ selected, tableId }: Props) {
    return (
        <div>
            <AppLink href={`/table/${tableId}/cart`}>
                <Icon
                    name="shopping-bag"
                    onClick={() => {}}
                />
            </AppLink>
        </div>
    );
}
