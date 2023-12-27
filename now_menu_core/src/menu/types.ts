import type { MenuItemRead } from "../menuItem/types.js";

export type Menu = {
    readonly [key: string]: readonly MenuItemRead[];
};
