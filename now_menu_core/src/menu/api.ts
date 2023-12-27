import type { ReqMaker } from "../core/reqMaker.js";
import type { Menu } from "./types.js";

function readMenuItem(
    maker: ReqMaker,
): Promise<Menu> {
    return maker.get("menu");
}

export const menuAPI = {
    read: readMenuItem,
} as const;
