import { create } from "zustand";
import type { AccountAddress, AccountCreate, AccountGeneral, AccountLogin } from "now_menu_core";

type CreateAccountStore = {
    readonly account: Partial<AccountCreate>;
    readonly setGeneral: (general: AccountGeneral) => void;
    readonly setAddress: (address: AccountAddress) => void;
    readonly setLogin: (login: AccountLogin) => void;
    readonly clear: () => void;
};

export const useCreateAccountStore = create<CreateAccountStore>((set) => ({
    account: {},
    setGeneral: (general: AccountGeneral) =>
        set(({ account }) => ({ account: { ...account, general } })),
    setAddress: (address: AccountAddress) =>
        set(({ account }) => ({ account: { ...account, address } })),
    setLogin: (login: AccountLogin) => set(({ account }) => ({ account: { ...account, login } })),
    clear: () => set({ account: {} }),
}));
