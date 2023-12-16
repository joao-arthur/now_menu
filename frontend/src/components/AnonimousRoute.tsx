import { useRouter } from "next/navigation";
import { useSessionStore } from "@/domains/session";

export function useAnonimousRoute() {
    const router = useRouter();
    const { session } = useSessionStore();

    if (session.logged) {
        router.push("/orders");
    }
}
