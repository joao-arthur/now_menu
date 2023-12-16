import { useRouter } from "next/router";
import { useSessionStore } from "@/domains/session";

export function useUserRoute() {
    const router = useRouter();
    const { session } = useSessionStore();

    if (!session.logged && session.verified) {
        router.push("/signin");
    }
}
