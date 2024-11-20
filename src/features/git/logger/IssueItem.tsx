import { Stopwatch } from "@/src/features/git/logger/Stopwatch";
import { IssueType } from "@/src/types/issue";

interface IssueItemProps {
  issue: IssueType;
  onRequestLogTime: (issue: IssueType, time: number) => void;
  resetAfterSuccess: boolean;
}

export const IssueItem = ({
  issue,
  onRequestLogTime,
  resetAfterSuccess,
}: IssueItemProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-lg shadow-md border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
      {/* Section d'informations sur l'issue */}
      <div className="w-full sm:w-[40%] flex flex-col sm:flex-row items-start sm:items-center">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mx-2 sm:mx-4">
            {issue.title}
          </h2>

          <div className="flex flex-col items-start">
            <p className="text-sm text-gray-700 dark:text-gray-400 mx-2 sm:mx-4">
              <strong>Statut :</strong> {issue.state}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-400 mx-2 sm:mx-4">
            <strong>Temps passé :</strong>{" "}
              {issue.time_stats?.human_total_time_spent || "Non disponible"}
            </p>
          </div>
        </div>
      </div>
      {/* Section de la minuterie */}
      <div className="w-full sm:w-[60%] mt-4 sm:mt-0 flex justify-end sm:justify-start">
        <Stopwatch
          issueId={issue.iid}
          projectId={issue.project_id}
          onRequestLogTime={() => onRequestLogTime(issue, 0)}
          resetAfterSuccess={resetAfterSuccess}
        />
      </div>
    </div>
  );
};