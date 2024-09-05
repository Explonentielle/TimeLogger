import { requiredCurrentUser } from "@/src/features/auth/action/current-user";
import { AccessTokenInput } from "@/src/features/git/logger/AccesTokenInput";
import { Layout } from "@/src/features/layout/Layout";
import RouteError from "../error";

export default async function RouteParams() {
  try {
    const user = await requiredCurrentUser();

    return (
      <Layout className="h-[80vh]">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 mb-8 dark:bg-gray-800 dark:border-gray-700 border border-gray-300">
          <AccessTokenInput />
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
