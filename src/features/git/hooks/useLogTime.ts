"use client"

import { useState } from "react";

import { IssueType } from "@/src/types/issue";
import { useToast } from "@/src/components/ui/use-toast";
import { ActionConfirm } from "@/src/features/git/class/ActionConfirm";
import { logTimeForIssue } from "../serverActions/git.action";

export const useLogTime = () => {
  const [confirmAction, setConfirmAction] = useState<ActionConfirm | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<IssueType | null>(null);
  const [toLogTime, setToLogTime] = useState<number>(0);
  const { toast } = useToast();

  const handleRequestLogTime = (issue: IssueType, seconds: number) => {
    setSelectedIssue(issue);
    setToLogTime(seconds);
    setConfirmAction(new ActionConfirm("Êtes-vous sûr de vouloir enregistrer ce temps ?"));
  };

  const handleConfirmLog = async (setAssignedIssues: Function) => {
    if (selectedIssue) {
      try {
        const simpleIssue = {
          accessToken: selectedIssue.accessToken,
          id: selectedIssue.id,
          iid: selectedIssue.iid,
          project_id: selectedIssue.project_id,
          title: selectedIssue.title,
          state: selectedIssue.state,
          time_stats: selectedIssue.time_stats,
        };

        const res = await logTimeForIssue(simpleIssue, toLogTime);

        setAssignedIssues((prevIssues: IssueType[]) =>
          prevIssues.map((issue) =>
            issue.id === selectedIssue.id ? { ...issue, time_stats: res } : issue
          )
        );

        toast({
          title: "Succès",
          description: "Temps enregistré avec succès !",
          variant: "succes",
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: error instanceof Error ? error.message : "Erreur inconnue.",
          variant: "destructive",
        });
      }
      setConfirmAction(null);
    }
  };

  return { confirmAction, handleRequestLogTime, handleConfirmLog, setConfirmAction };
};
