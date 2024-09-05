"use client";

import { useState } from "react";
import { IssueType } from "@/src/types/issue";
import { useToast } from "@/src/components/ui/use-toast";
import { fetchAssignedIssues } from "../serverActions/git.action";
import { Token } from "@prisma/client";

export const useFetchIssues = (token: string) => {
  const { toast } = useToast();
fetchAssignedIssues
  const handleFetchAssignedIssues = async () => {
    try {
      const issues = await fetchAssignedIssues(token);
      toast({
        title: "Succès",
        description: `Issues récupéré avec succès !`,
        variant: "succes",
      });
      return issues;
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur inconnue s'est produite.",
        variant: "destructive",
      });
    }
  };

  return handleFetchAssignedIssues; 
};