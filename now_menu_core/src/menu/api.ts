import type { HTTPProvider } from "../httpProvider.js";
import type { Menu } from "./types.js";

export function menuRead(p: HTTPProvider): Promise<Menu> {
    return p.get("menu");
}
