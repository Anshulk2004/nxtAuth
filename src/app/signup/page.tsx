import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { hash } from "bcryptjs";
import { redirect } from 'next/navigation';
import { connectToDatabase } from "@/lib/utils";
import User from "@/models/userModel";
import SignUpForm from "./SignUpForm";


const Page = () => {
  
  let redirectPath: string | null = '/login'
    const SignUp = async (formData: FormData) => {
        "use server";
        
        const name = formData.get("name") as string | undefined;
        const email = formData.get("email") as string | undefined;
        const password = formData.get("password") as string | undefined;

        if(!email || !password || !name)
            return "Please provide all fields";

        let path = "/signup"
        try {
            await connectToDatabase();

            const user = await User.findOne({email});
            if(user) return "User already exists";

            const hashedPassword = await hash(password, 10);

            await User.create({
                name,
                email,
                password: hashedPassword,
            }
          );
          path = "/login"

        } catch (error) {
            path = '/signup'
            console.error(error);
            return "An error occurred during signup";
            
        }finally{
          if ( path = "/login")
          redirect(path)
        }

    };

    return (
        <div className="flex justify-center items-center h-dvh">
            <Card>
                <CardHeader>
                    <CardTitle>Sign up</CardTitle>
                </CardHeader>
                <CardContent>
                    <SignUpForm onSubmit={SignUp} />
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <span>Or</span>
                    <form action="">
                        <Button type="submit" variant={"outline"}>
                            Login With Google
                        </Button>
                    </form>
                    <Link className="mt-2" href="/login">
                        Already have an account? Login
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Page;