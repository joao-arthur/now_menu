"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUpStore } from "@/lib/session/useSignUpStore";

import { LogoImg } from "@/components/Image/LogoImg";
import { Layout } from "@/components/layout/Layout";

export default function SignUpPage() {
    const router = useRouter();
    const { values, setCNPJ, setName, setTelephone } =
        useSignUpStore();
    const [submitted, setSubmitted] = useState(false);
    const validForm =
        values.cnpj.replaceAll(/[^0-9]/g, "").length === 14 &&
        values.name &&
        values.telephone.replaceAll(/[^0-9]/g, "").length === 11;

    function submit() {
        if (!validForm) return;
        setSubmitted(true);
    }

    if (submitted) {
        router.push("/signup/address");
    }

    return (
        <Layout.Container>
            <Layout.Content>
            <LogoImg/>
            <div className="">
            <p className="">eriueriuh</p>
            <p className="bg-blue-100">eriueriuh</p>
            <p className="">eriueriuh</p>

            </div>
            </Layout.Content>
        </Layout.Container>
    );
}
