// "use client" 

// import { useState } from "react";
// import { AccessTokenInput } from "./logger/AccesTokenInput";
// import { IssueItem } from "./logger/IssueItem";
// import { ConfirmModal } from "@/src/components/ConfirmModal";
// import { useFetchIssues } from "./hooks/useFetchIssues";
// import { useLogTime } from "./hooks/useLogTime";
// import { requiredCurrentUser } from "../auth/action/current-user";
// import { prisma } from "@/src/prisma";


// export default async function GitHome() {
//   const user = await requiredCurrentUser();

//   const token = await prisma.token.findFirst({
//     where: { userId: user.id },
//   });

//   if (!token) {}

//   const { assignedIssues, handleFetchAssignedIssues, setAssignedIssues } = useFetchIssues(token);
//   const { confirmAction, handleRequestLogTime, handleConfirmLog, setConfirmAction } = useLogTime();

//   return (
//     <>
//       <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 mb-8 dark:bg-gray-800 dark:border-gray-700 border border-gray-300">
//         <AccessTokenInput/>

//         {/* {assignedIssues.length > 0 && (
//           <div className="flex flex-col space-y-4">
//             {assignedIssues.map((issue) => (
//               <IssueItem
//                 key={issue.id}
//                 issue={issue}
//                 onRequestLogTime={handleRequestLogTime}
//                 resetAfterSuccess={false}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       <ConfirmModal
//         isOpen={confirmAction !== null}
//         onClose={() => setConfirmAction(null)}
//         onConfirm={() => handleConfirmLog(assignedIssues, setAssignedIssues)}
//         confirmMessage={confirmAction?.message || ""}
//       /> */}
//     </>
//   );
// }
