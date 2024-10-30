import React from "react";

import { SignInButton } from "./SignInButton";

import { LoggedInDropDown } from "./LoggedInDropDown";
import { Button } from "@/src/components/ui/button";
import { prisma } from "@/src/prisma";
import { baseAuth } from "@/src/features/auth/action/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";

export const LoggedInButton = async () => {
  const session = await baseAuth();

  if (!session?.user) {
    return <SignInButton />;
  }

  if (session.user.id) {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (user) {
      const current = {
        id: user.id,
        name: user.name || "",
        email: user.email || "",
        photoUrl: user.image || "",
        username: user.image || "",
      };


      return (
        <LoggedInDropDown current={current}>
          <Button variant="outline" size="sm" className="mx-6">
            <Avatar className={`size-7`}>
              <AvatarFallback>{current.username[0]}</AvatarFallback>
              <AvatarImage src={current.photoUrl} alt={`avatar`} />
            </Avatar>
          </Button>
        </LoggedInDropDown>
      );
    }
  }
};
