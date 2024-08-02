"use server";
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

const credentialsLogin = async (email: string|undefined, password: string|undefined) => {      
    try{
        await signIn("credentials",{
            email,
            password,
            redirect: true,
            redirectTo: "/",
        });
    }catch(error){
        const err = error as CredentialsSignin;
        return err.cause;
    }
}; 

export {credentialsLogin};