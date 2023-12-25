import type { ReqMaker } from "../core/reqMaker";
import type {
    AccountAddress,
    AccountCreate,
    AccountGeneral,
    AccountLogin,
    AccountRead,
} from "./types";

function createAccount(
    maker: ReqMaker,
    account: AccountCreate,
): Promise<AccountRead> {
    return maker.post("account", account);
}

function readAccount(
    maker: ReqMaker,
): Promise<AccountRead> {
    return maker.get("account");
}

function updateGeneral(
    maker: ReqMaker,
    general: AccountGeneral,
): Promise<AccountRead> {
    return maker.put("account/general", general);
}

function updateAddress(
    maker: ReqMaker,
    address: AccountAddress,
): Promise<AccountRead> {
    return maker.put("account/address", address);
}

function updateLogin(
    maker: ReqMaker,
    login: AccountLogin,
): Promise<AccountRead> {
    return maker.put("account/login", login);
}

function deleteAccount(
    maker: ReqMaker,
): Promise<void> {
    return maker.delete("account");
}

export const accountAPI = {
    create: createAccount,
    read: readAccount,
    updateGeneral: updateGeneral,
    updateAddress: updateAddress,
    updateLogin: updateLogin,
    delete: deleteAccount,
} as const;
