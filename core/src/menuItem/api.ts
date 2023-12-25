import { ReqMaker } from "../core/reqMaker";
import { MenuItem, MenuItemCreate, MenuItemRead, MenuItemUpdate } from "./types";

function createMenuItem(
    maker: ReqMaker,
    menuItem: MenuItemCreate,
): Promise<MenuItemRead> {
    return maker.post("menu-item", menuItem);
}

function readMenuItem(
    maker: ReqMaker,
): Promise<MenuItemRead> {
    return maker.get("menu-item");
}

function updateMenuItem(
    maker: ReqMaker,
    id: MenuItem["id"],
    menuItem: MenuItemUpdate,
): Promise<MenuItemRead> {
    return maker.put(`menu-item/${id}`, menuItem);
}

function deleteMenuItem(
    maker: ReqMaker,
    id: MenuItemRead["id"],
): Promise<void> {
    return maker.delete(`menu-item/${id}`);
}

export const menuItemAPI = {
    create: createMenuItem,
    read: readMenuItem,
    update: updateMenuItem,
    delete: deleteMenuItem,
} as const;
