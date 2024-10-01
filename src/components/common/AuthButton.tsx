"use client";
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "../ui/button";

export const AuthButton = () => {
  const { data: session } = useSession()
  if (session) {
    return <Button className="bg-white text-black hover:bg-white" onClick={() => {
      signOut()
    }}>Sign out</Button>
  }
  return <Button className="bg-white text-black hover:bg-white" onClick={() => signIn()}>Sign in</Button>
}
