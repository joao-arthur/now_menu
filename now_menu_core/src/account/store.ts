import { create } from "zustand";
import type { AccountAddress, AccountCreate, AccountGeneralInfo, AccountLogin } from "./types.js";

type CreateAccountStore = {
    readonly account: Partial<AccountCreate>;
    readonly setGeneral: (general: AccountGeneralInfo) => void;
    readonly setAddress: (address: AccountAddress) => void;
    readonly setLogin: (login: AccountLogin) => void;
    readonly clear: () => void;
};

export const useCreateAccountStore = create<CreateAccountStore>((set) => ({
    account: {},
    setGeneral: (general: AccountGeneralInfo) => set(({ account }) => ({ account: { ...account, general } })),
    setAddress: (address: AccountAddress) => set(({ account }) => ({ account: { ...account, address } })),
    setLogin: (login: AccountLogin) => set(({ account }) => ({ account: { ...account, login } })),
    clear: () => set({ account: {} }),
}));
