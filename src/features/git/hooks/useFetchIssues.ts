"use client";

import { useToast } from "@/src/components/ui/use-toast";
import { fetchAssignedIssues, fetchToken} from "../serverActions/git.action";
import { ActionError } from "../class/ActionError";

export const useFetchIssues = (selectedApiSource: string) => {
  const { toast } = useToast();

  const handleFetchAssignedIssues = async () => {
    try {
      const token = await fetchToken(selectedApiSource);
      if (!token.data?.token) {
        throw new ActionError('Token non trouvé');
      }
      
      const issues = await fetchAssignedIssues(token.data.token);
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