import { ReqMaker } from "../core/reqMaker";
import { Menu } from "./types";

function readMenuItem(
    maker: ReqMaker,
): Promise<Menu> {
    return maker.get("menu");
}

export const menuAPI = {
    read: readMenuItem,
} as const;
