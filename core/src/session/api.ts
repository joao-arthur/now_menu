import type { ReqMaker } from "../core/reqMaker";
import type { AccountLogin } from "../account/types";
import type { Session } from "./types";

function createSession(maker: ReqMaker, accountLogin: AccountLogin): Promise<Session> {
    return maker.post("session", accountLogin);
}

export const sessionAPI = {
    create: createSession,
} as const;
