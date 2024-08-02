"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import router from "next/router";

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Signing up..." : "Sign up"}
        </Button>
    );
};

const SignUpForm = ({ onSubmit }: { onSubmit: (formData: FormData) => Promise<string | void> }) => {
    const [error, setError] = useState("");

    const handleSubmit = async (formData: FormData) => {
        const result = await onSubmit(formData);
        if (result === "success") {
            router.push('/login'); 
        } else {
            setError(result);
        }
    };

    return (
        <>
            {error && <p className="text-red-500">{error}</p>}
            <form action={handleSubmit} className="flex flex-col gap-4">
                <Input placeholder="Name" name="name"/>
                <Input type="email" placeholder="Email" name="email" />
                <Input placeholder="Password" type="password" name="password" />
                <SubmitButton />
            </form>
        </>
    );
};

export default SignUpForm;