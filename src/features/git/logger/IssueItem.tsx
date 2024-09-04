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
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
      <div className="flex justify-center items-center w-1/2">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mx-4">
          {issue.title}
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-400  mx-4">
          Statut: {issue.state}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-400  mx-4">
          Temps passé: {issue.time_stats?.human_total_time_spent || "Non disponible"}
        </p>
      </div>
      <div className="ml-4 w-1/2">
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
