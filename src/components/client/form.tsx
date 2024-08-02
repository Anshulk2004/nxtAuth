"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { credentialsLogin } from "@/actions/login";
import { useRouter } from "next/navigation";


const LoginForm = ()=>{

    const router = useRouter()
    return (
    <form action = {async (formData) => {

        const email = formData.get("email") as string | undefined;
        const password = formData.get("password") as string | undefined;

        if(!email || !password)  return toast.error("Please provide all fields");

        const toastId = toast.loading("Logging In");

        const error =  await credentialsLogin(email,password);
        
        if(!error){
             toast.success("Login Sucessfull" ,{
             id: toastId,
            });  
            router.refresh(); 
        }    
            else{
                toast.error(String(error),{
                id: toastId,          
            });            
        }         
      }} 
      className="flex flex-col gap-4">
        <Input type="email" placeholder="Email" name="email" />
        <Input placeholder="Password" type="password" name="password" />
        <Button type="submit">Login</Button>
      </form>
    );
};

export{
    LoginForm
}



