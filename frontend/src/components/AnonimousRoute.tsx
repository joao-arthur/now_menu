import { useRouter } from "next/router";
import { useSessionStore } from "@/domains/session";

export function useAnonimousRoute() {
    const router = useRouter();
    const { session } = useSessionStore();

    if (session.logged) {
        router.push("/orders");
    }
}
