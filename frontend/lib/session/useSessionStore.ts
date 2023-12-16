import { create } from "zustand";

type Session = {
    readonly logged: boolean;
    readonly verified: boolean;
};

type SessionStore = {
    readonly session: Session;
    readonly setLogged: (isLogged: boolean) => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
    session: {
        logged: false,
        verified: false,
    },
    setLogged: (isLogged: boolean) =>
        set({ session: { logged: isLogged, verified: true } }),
}));
