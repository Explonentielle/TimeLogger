"use server";

import { Issue } from "@/src/features/git/class/Issue";
import { IssueManager } from "@/src/features/git/class/IssueManager";
import { prisma } from "@/src/prisma";
import { ActionError, userAction } from "@/src/safe.action";
import { IssueType } from "@/src/types/issue";
import { TokenSchema } from "@/prisma/schemas/token.schema";

const verifyTokenUniqueness = async (token: string) => {
  const tokenExists = await prisma.token.count({
    where: {
      token: token,
    },
  });

  if (tokenExists) {
    throw new ActionError("Votre jeton est déja enregistré");
  }
};

export const fetchAssignedIssues = async (accessToken: string) => {
  try {
    const issueManager = new IssueManager(accessToken as string);
    const res: Issue[] = await issueManager.fetchAssignedIssues(); // Typage explicite ici

    // Transformer les objets de classe 'Issue' en objets JSON simples
    const issues: IssueType[] = res.map((issue) => ({
      accessToken,
      id: issue.issue.id,
      iid: issue.issue.iid,
      project_id: issue.issue.project_id,
      title: issue.issue.title,
      state: issue.issue.state,
      time_stats: issue.issue.time_stats,
    }));
    return issues;
  } catch (error) {
    if (error instanceof Error) {
      throw new ActionError(`${error.message}`);
    } else {
      throw new ActionError("Une erreur inconnue s'est produite.");
    }
  }
};

export const logTimeForIssue = async (
  selectedIssue: IssueType,
  seconds: number
) => {
  try {
    const issueInstance = new Issue(selectedIssue); // Recréer l'instance d'Issue
    const response = await issueInstance.logTime(seconds);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new ActionError(
        `Erreur lors de la récupération des issues : ${error.message}`
      );
    } else {
      throw new ActionError("Une erreur inconnue s'est produite.");
    }
  }
};

export const addTokenAction = userAction(
  TokenSchema,
  async (input, context) => {
    await verifyTokenUniqueness(input.token);

    const token = await prisma.token.create({
      data: {
        ...input,
        userId: context.user.id,
      },
    });

    return token;
  }
);
