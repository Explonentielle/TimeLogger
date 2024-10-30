"use client";

import { ConfirmModal } from "@/src/components/ConfirmModal";
import { IssueItem } from "./IssueItem";
import { useLogTime } from "../hooks/useLogTime";
import { useState } from "react";
import { IssueType } from "@/src/types/issue";
import { useFetchIssues } from "../hooks/useFetchIssues";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Token } from "@prisma/client";

interface LoggerContainerProps {
  tokens: Token[];
}

export default function LoggerContainer({ tokens }: LoggerContainerProps) {
  const [assignedIssues, setAssignedIssues] = useState<IssueType[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [selectedApiSource, setSelectedApiSource] = useState("");


  const fetchIssues = useFetchIssues(selectedApiSource);

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

      <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Sélectionnez un token
        </h2>

        <Select value={selectedApiSource} onValueChange={setSelectedApiSource}>
          <SelectTrigger>
            <SelectValue></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {tokens.map((token, index: number) => {
              return (
                <SelectItem value={token.id} key={token.apiSource + index}>
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        "https://seeklogo.com/images/G/gitlab-logo-FAA48EFD02-seeklogo.com.png"
                      }
                      alt={`${token.apiSource + index} logo`}
                      className="w-6 h-6 rounded-full"
                    />
                    <div className="flex items-center">
                      <span className="font-medium mx-6">{token.apiSource}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {token.description} • Créé le 
                        {' ' + new Date(token.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

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
