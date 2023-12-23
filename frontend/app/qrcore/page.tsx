"use client";

import { Layout } from "@/comp/layout/Layout";

export default function QRCodePage() {
    let userId = "789798";
    if (!userId) return null;

    const baseURL = `http://localhost:8080/table/qrcode`;
    const origin = window.location.origin;
    const params = new URLSearchParams({ userId, origin }).toString();

    return (
        <Layout.Container>
            <div>
                <iframe
                    title="viewqrcodes"
                    src={`${baseURL}?${params}`}
                />
            </div>
            <div>
            </div>
        </Layout.Container>
    );
}
