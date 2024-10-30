"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
import { PropsWithChildren, useContext, useEffect } from "react"
import { singOutAction } from "./action/auth.action"
import { LogOut, User } from "lucide-react"
import Link from "next/link"




interface LoggedInDropDownProps extends PropsWithChildren {
    current: {
        id?: string,
        name:string,
        email: string,
        photoUrl: string,
      }
}

export const LoggedInDropDown = (props: LoggedInDropDownProps) => {
    const { current, children } = props;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <Link href={`/users/${current.id}`}>
                    <DropdownMenuItem >
                        <User size='16' className="mr-2" />
                        Profil
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => {
                    singOutAction();
                }}>
                    <LogOut size='16' className="mr-2" />
                    LogOut
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
