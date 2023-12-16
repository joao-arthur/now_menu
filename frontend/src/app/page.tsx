"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSessionStore } from "@/lib/session/useSessionStore";

export default function AppPage() {
    const router = useRouter();
    const { session, setLogged } = useSessionStore();

    useEffect(() => {
        const token = window.localStorage.getItem(
            "@NOW_MENU/user/token",
        );
        setLogged(!!token);
    }, []);

    useEffect(() => {
        if (!session.logged && session.verified) {
            router.push("/signin");
        }
        if (session.logged) {
            router.push("/menu");
        }
    }, [session]);

    return <div></div>;
}
