"use client";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { AuthButton } from "./AuthButton";

export const Navbar: FC = () => {
  const { data: session } = useSession();
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Calorie Tracker</h1>
        <div className="flex direction-reverse justify-center items-center gap-6">
          {session && <p>{session.user?.name}</p>}
          <AuthButton />
        </div>
      </div>
    </header>
  );
};
