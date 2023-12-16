import { useRouter } from "next/navigation";
import { useSessionStore } from "@/lib/session/useSessionStore";

export function useAnonRoute() {
    const router = useRouter();
    const { session } = useSessionStore();

    if (session.logged) {
        router.push("/orders");
    }
}
