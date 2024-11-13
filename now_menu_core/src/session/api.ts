import type { HTTPProvider } from "../httpProvider.js";
import type { AccountLogin } from "../account/types.js";
import type { Session } from "./types.js";

export function sessionCreate(p: HTTPProvider, accountLogin: AccountLogin): Promise<Session> {
    return p.post("session", accountLogin);
}
