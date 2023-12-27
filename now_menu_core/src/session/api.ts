import type { ReqMaker } from "../core/reqMaker.js";
import type { AccountLogin } from "../account/types.js";
import type { Session } from "./types.js";

function createSession(
    maker: ReqMaker,
    accountLogin: AccountLogin,
): Promise<Session> {
    return maker.post("session", accountLogin);
}

export const sessionAPI = {
    create: createSession,
} as const;
