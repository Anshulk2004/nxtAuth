import { User } from "@/models/userModel"
import { compare } from 'bcryptjs'
import NextAuth, { CredentialsSignin } from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers:[
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialProvider({
        name :"Credentials",
        credentials: {
            email: {
                label:"Email",
                type:"email",
            },
            password:{
                label:"Password",
                type:"password"
            },
        },
        authorize: async (credentials) =>{
            const email = credentials.email as string;
            const password = credentials.password as string;
            console.log(email,password); 

            if(typeof email !=="string" || !password) throw new CredentialsSignin({
                cause: "Email and password cannot be blank. ",
            });
            const user = await User.findOne({email}).select("+password");

            if(!user) 
                throw new CredentialsSignin({cause: "Invalid Email or Password"});
            if(!user.password)
                throw new CredentialsSignin({cause: "Password is Invalid"});

            // const isMatch = await user.matchPassword(password);
            const isMatch = await compare(password,user.password);
            if(!isMatch) 
                throw new CredentialsSignin({cause: "Invalid Email or Password"});

            
            return {name: user.name, email: user.email, id:user._id};     
        },
    }),
  ], 
  pages:{
    signIn: "/login",
  },
});