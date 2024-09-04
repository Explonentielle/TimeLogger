"use server"

import { signIn, signOut } from "@/src/features/auth/action/auth";



export const singOutAction = async () => {
  await signOut();
};

export const signInAction = async () => {
  await signIn();
};