"use client";

import { ConfirmModal } from "@/src/components/ConfirmModal";
import { IssueItem } from "./IssueItem";
import { useLogTime } from "../hooks/useLogTime";
import { useState } from "react";
import { IssueType } from "@/src/types/issue";
import { useFetchIssues } from "../hooks/useFetchIssues";
import { ActionError } from "../class/ActionError";

interface LoggerContainerProps {
  token: string;
}

export default function LoggerContainer({ token }: LoggerContainerProps) {
  const [assignedIssues, setAssignedIssues] = useState<IssueType[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchIssues = useFetchIssues(token);

  const handleSearchIssues = async () => {
    setIsFetching(true);

    const issues = await fetchIssues();

    if (issues) {
      setAssignedIssues(issues); 
    }
    setIsFetching(false);
  };

  const {
    confirmAction,
    handleRequestLogTime,
    handleConfirmLog,
    setConfirmAction,
  } = useLogTime();

  return (
    <>
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={handleSearchIssues}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={isFetching}
        >
          {isFetching ? "Chargement..." : "Récupérer les issues"}
        </button>

        {assignedIssues.length > 0 ? (
          <div className="flex flex-col space-y-4 w-full">
            {assignedIssues.map((issue) => (
              <IssueItem
                key={issue.id}
                issue={issue}
                onRequestLogTime={handleRequestLogTime}
                resetAfterSuccess={false}
              />
            ))}
          </div>
        ) : null }
      </div>

      <ConfirmModal
        isOpen={confirmAction !== null}
        onClose={() => setConfirmAction(null)}
        onConfirm={() => handleConfirmLog( setAssignedIssues)}
        confirmMessage={confirmAction?.message || ""}
      />
    </>
  );
}
