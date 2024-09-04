"use client";


import { LogIn } from "lucide-react";
import { signInAction } from "./action/auth.action";
import { Button } from "@/src/components/ui/button";

export const SignInButton = () => {
    return (
        <Button
            variant="secondary"
            size="sm"
            onClick={()  => {
                signInAction();
            }}
        >
            <LogIn size={16} className="mr-2" />
            Sign In
        </Button>
    )
}
  

