"use client";

import { ConfirmModal } from "@/src/components/ConfirmModal";
import { IssueItem } from "./IssueItem";
import { useLogTime } from "../hooks/useLogTime";
import { useEffect, useState } from "react";
import { IssueType } from "@/src/types/issue";
import { useFetchIssues } from "../hooks/useFetchIssues";
import { Token } from "@prisma/client";
import { SelectorContainer } from "@/src/components/SelectorContainer";
import { apisSources } from "@/src/lib/apiSources";

interface LoggerContainerProps {
  tokens: Token[];
}

export default function LoggerContainer({ tokens }: LoggerContainerProps) {
  const [assignedIssues, setAssignedIssues] = useState<IssueType[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [selectedApiSource, setSelectedApiSource] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [isServiceSelected, setIsServiceSelected] = useState(false);

  const fetchIssues = useFetchIssues(selectedApiSource);
  
  useEffect(() => {
    setAssignedIssues([])
  }, [selectedApiSource]);

  const handleSearchIssues = async () => {
    setIsFetching(true);

    const issues = await fetchIssues();

    if (issues) {
      setAssignedIssues(issues);
    }
    setIsFetching(false);
  };

  const selectService = () => {
    setIsFetching(true);
    setIsServiceSelected(true);

    setTimeout(() => {
      setIsFetching(false);
    }, 500);
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
          {isServiceSelected
            ? "Sélectionnez un jeton"
            : "Sélectionnez un service"}
        </h2>

        {isServiceSelected ? (
          <SelectorContainer
            items={tokens
              .filter(
                (token) =>
                  token.apiSource == apisSources[Number(selectedService)].name
              )
              .map((token) => ({
                id: token.id,
                name: token.apiSource,
                description: token.description,
                createdAt: token.createdAt
                  ? new Date(token.createdAt).toISOString()
                  : undefined,
              }))}
            buttonTextLoading="Chargement..."
            buttonTextDefault="Récupérer les tickets"
            showCreationDate={true}
            isFetching={isFetching}
            selectedItem={selectedApiSource}
            setSelectedItem={setSelectedApiSource}
            handleSearch={handleSearchIssues}
          />
        ) : (
          <SelectorContainer
            items={apisSources.map((apisSource, index) => ({
              id: index.toString(),
              name: apisSource.name,
              logoUrl: apisSource.image,
            }))}
            buttonTextLoading="Chargement..."
            buttonTextDefault="Choisir un service"
            showCreationDate={true}
            isFetching={isFetching}
            selectedItem={selectedService}
            setSelectedItem={setSelectedService}
            handleSearch={selectService}
          />
        )}

        {isServiceSelected ? (
          <div className="flex items-center w-full">
            <span className="flex-grow"></span>

            <button
              onClick={() => setIsServiceSelected(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt- ml-auto w-1/3"
            >
              Revenir à la sélection du service
            </button>
          </div>
        ) : null}

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
        ) : null}
      </div>

      <ConfirmModal
        isOpen={confirmAction !== null}
        onClose={() => setConfirmAction(null)}
        onConfirm={() => handleConfirmLog(setAssignedIssues)}
        confirmMessage={confirmAction?.message || ""}
      />
    </>
  );
}
