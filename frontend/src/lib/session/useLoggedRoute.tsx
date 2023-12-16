import { useRouter } from "next/navigation";
import { useSessionStore } from "@/lib/session/useSessionStore";

export function useLoggedRoute() {
    const router = useRouter();
    const { session } = useSessionStore();

    if (!session.logged && session.verified) {
        router.push("/signin");
    }
}
