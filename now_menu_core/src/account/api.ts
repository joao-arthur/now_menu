import type { HTTPProvider } from "../httpProvider.js";
import type {
    AccountAddress,
    AccountCreate,
    AccountGeneralInfo,
    AccountLogin,
    AccountRead,
} from "./types.js";

export function accountCreate(p: HTTPProvider, account: AccountCreate): Promise<AccountRead> {
    return p.post("account", account);
}

export function accountRead(p: HTTPProvider): Promise<AccountRead> {
    return p.get("account");
}

export function accountUpdateGeneralInfo(
    p: HTTPProvider,
    general: AccountGeneralInfo,
): Promise<AccountRead> {
    return p.put("account/general", general);
}

export function accountUpdateAddress(
    p: HTTPProvider,
    address: AccountAddress,
): Promise<AccountRead> {
    return p.put("account/address", address);
}

export function accountUpdateLogin(p: HTTPProvider, login: AccountLogin): Promise<AccountRead> {
    return p.put("account/login", login);
}

export function accountDeleteAccount(p: HTTPProvider): Promise<void> {
    return p.delete("account");
}
