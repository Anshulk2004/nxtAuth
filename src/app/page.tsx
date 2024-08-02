import Image from "next/image";
import {auth} from "@/auth";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  console.log("Home -> user",user);


  return (
    <div>
      <h1>Hello Anshul</h1>
    </div>
  );
}
