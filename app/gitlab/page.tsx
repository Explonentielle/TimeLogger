import { currentUser } from "@/src/features/auth/action/current-user";
import RouteError from "../users/error";
import { Layout } from "@/src/features/layout/Layout";
import Link from "next/link";
import { Clock, Key, User } from "lucide-react";

export default async function RouteParams() {
  try {
    const user = await currentUser();

    return (
      <Layout className="h-[80vh] flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 mb-8 dark:bg-gray-800 dark:border-gray-700 border border-gray-300">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Gestion des Outils</h1>
          <p className="mb-8 text-gray-700 dark:text-gray-300">
            Vous pouvez gérer vos tokens d'accès et suivre vos heures à l'aide des outils suivants :
          </p>
          <div className="flex flex-col gap-6">
            <Link href="/gitlab/tokenmanager" className="flex items-center px-4 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out">
              <Key className="mr-3" />
              <span>Accéder au Token Manager</span>
            </Link>
            <Link href="/gitlab/timelogger" className="flex items-center px-4 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out">
              <Clock className="mr-3" />
              <span>Accéder au Time Logger</span>
            </Link>
            <Link href="#" className="flex items-center px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out">
              <User className="mr-3" />
              <span>Voir Profil</span>
            </Link>
          </div>
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
