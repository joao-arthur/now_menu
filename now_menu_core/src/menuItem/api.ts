import type { HTTPProvider } from "../httpProvider.js";
import type { MenuItem, MenuItemCreate, MenuItemRead, MenuItemUpdate } from "./types.js";

export function menuItemCreate(p: HTTPProvider, menuItem: MenuItemCreate): Promise<MenuItemRead> {
    return p.post("menu-item", menuItem);
}

export function menuItemRead(p: HTTPProvider): Promise<MenuItemRead> {
    return p.get("menu-item");
}

export function menuItemUpdate(
    p: HTTPProvider,
    id: MenuItem["id"],
    menuItem: MenuItemUpdate,
): Promise<MenuItemRead> {
    return p.put(`menu-item/${id}`, menuItem);
}

export function menuItemDelete(p: HTTPProvider, id: MenuItemRead["id"]): Promise<void> {
    return p.delete(`menu-item/${id}`);
}
