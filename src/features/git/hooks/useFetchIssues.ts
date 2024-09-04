"use client"

import { useState } from "react";
import { IssueType } from "@/src/types/issue";
import { useToast } from "@/src/components/ui/use-toast";
import { fetchAssignedIssues } from "../serverActions/git.action";
import { Token } from "@prisma/client";

export const useFetchIssues = (accessToken: Token) => {
  const [assignedIssues, setAssignedIssues] = useState<IssueType[]>([]);
  const { toast } = useToast();

  console.log(accessToken.token);

  const handleFetchAssignedIssues = async () => {  
    try {
      const issues = await fetchAssignedIssues(accessToken.token);
      console.log(issues);
      setAssignedIssues(issues);
      toast({
        title: "Succès",
        description: `Issues récupéré avec succès !`,
        variant: "succes",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur inconnue s'est produite.",
        variant: "destructive",
      });
    }
  };

  return { assignedIssues, handleFetchAssignedIssues, setAssignedIssues };
};
