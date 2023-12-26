import type { MenuItemRead } from "../menuItem/types";

export type Menu = {
    readonly [key: string]: readonly MenuItemRead[];
};
