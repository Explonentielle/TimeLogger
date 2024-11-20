import { requiredCurrentUser } from "@/src/features/auth/action/current-user";
import { prisma } from "@/src/prisma";
import { ActionError } from "@/src/safe.action";
import LoggerContainer from "@/src/features/git/logger/loggerContainer";
import { Layout } from "@/src/features/layout/Layout";
import RouteError from "../error";

export default async function RouteParams() {
  try {
    const user = await requiredCurrentUser();
    const tokens = await prisma.token.findMany({
      where: { userId: user.id },
    });

    if (!tokens) {
      throw new ActionError("Erreur lors de la récupération du token.");
    }

    return (
      <Layout className="h-full min-h-[82vh]">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 mb-8 dark:bg-gray-800 dark:border-gray-700 border border-gray-300">
          <LoggerContainer tokens={tokens} />
        </div>
      </Layout>
    );
  } catch (error) {
    return (
      <div className="h-[80vh]">
        <RouteError />
      </div>
    );
  }
}
