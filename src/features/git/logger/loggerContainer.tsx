"use client";

import { ConfirmModal } from "@/src/components/ConfirmModal";
import { IssueItem } from "./IssueItem";
import { useFetchIssues } from "../hooks/useFetchIssues";
import { useLogTime } from "../hooks/useLogTime";
import { Token } from "@prisma/client";

interface LoggerContainerProps {
  token: Token;
}

export default function LoggerContainer(props: LoggerContainerProps) {
  
  const { assignedIssues, setAssignedIssues } = useFetchIssues(props.token);
  const {
    confirmAction,
    handleRequestLogTime,
    handleConfirmLog,
    setConfirmAction,
  } = useLogTime();

  return (
    <>
      {assignedIssues.length > 0 && (
        <div className="flex flex-col space-y-4">
          {assignedIssues.map((issue) => (
            <IssueItem
              key={issue.id}
              issue={issue}
              onRequestLogTime={handleRequestLogTime}
              resetAfterSuccess={false}
            />
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={confirmAction !== null}
        onClose={() => setConfirmAction(null)}
        onConfirm={() => handleConfirmLog(assignedIssues, setAssignedIssues)}
        confirmMessage={confirmAction?.message || ""}
      />
    </>
  );
}
