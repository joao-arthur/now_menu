"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppPage() {
    const router = useRouter();

    useEffect(() => {
        window.setTimeout(() => {
            router.push("/signup/info");
        }, 1000);
    }, [router]);

    return <div></div>;
}
