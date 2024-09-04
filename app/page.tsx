import { currentUser } from "@/src/features/auth/action/current-user";
import { FAQSection } from "@/src/features/layout/FAQsection";
import { Section } from "@/src/features/layout/Section";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();

  return (
    <main className="flex flex-col items-center p-6 md:p-12 lg:p-16 min-h-screen bg-gray-100 dark:bg-gray-900">
      <Section className="text-center py-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg shadow-lg mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white animate__animated animate__fadeIn">
          Bienvenue sur Easy Log
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 animate__animated animate__fadeIn animate__delay-1s">
          Gérez vos projets et suivez votre temps de manière simple et efficace.
        </p>
        {!user && (
          <p className="mt-6 text-white animate__animated animate__fadeIn animate__delay-2s">
            <Link href="/login" className="underline">
              Inscrivez-vous
            </Link>{" "}
            pour découvrir toutes les fonctionnalités.
          </p>
        )}
      </Section>

      <Section className="max-w-6xl text-center mb-16 animate__animated animate__fadeIn animate__delay-3s">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Qu'est-ce qu'Easy Log ?
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Easy Log est une plateforme qui vous permet de suivre et d'enregistrer
          le temps passé sur vos projets. En quelques clics, vous pouvez gérer
          vos tâches et obtenir des rapports détaillés de votre productivité.
        </p>
      </Section>

      <Section className="flex flex-wrap justify-center gap-8">
        <div className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 w-full max-w-sm transform transition-transform hover:scale-105">
          <div className="flex items-center mb-4">
            <svg
              className="w-8 h-8 text-indigo-500 dark:text-indigo-400 mr-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M10 3V1H6v2H4v4h2v2H4v10h2v-6h2v6h2V7h2V3h2v4h2V3h-2z"></path>
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Gestion des issues
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Suivez vos tâches en temps réel et enregistrez facilement le temps
            passé sur chaque issue.
          </p>
          
          <Link href={'/gitlab'} className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out">
            Accéder à la gestion des issues
          </Link>
        </div>

        <div className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 w-full max-w-sm transform transition-transform hover:scale-105">
          <div className="flex items-center mb-4">
            <svg
              className="w-8 h-8 text-indigo-500 dark:text-indigo-400 mr-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Rapports d'activité
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Obtenez des rapports détaillés sur le temps passé et votre
            productivité pour chaque projet.
          </p>
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out">
            Voir les rapports d'activité
          </button>
        </div>

        <div className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 w-full max-w-sm transform transition-transform hover:scale-105">
          <div className="flex items-center mb-4">
            <svg
              className="w-8 h-8 text-indigo-500 dark:text-indigo-400 mr-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 13V7H5v6H2v4h2v-2h17v2h2v-4h-2zm-9-3h2v2h-2v-2z"></path>
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Intégration Git
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Suivez vos commits Git et intégrez-les directement dans vos tâches
            pour un suivi complet.
          </p>
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out">
            Intégrer avec Git
          </button>
        </div>

        <div className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 w-full max-w-sm transform transition-transform hover:scale-105">
          <div className="flex items-center mb-4">
            <svg
              className="w-8 h-8 text-indigo-500 dark:text-indigo-400 mr-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Historique des tâches
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Consultez l'historique complet de vos tâches et revenez sur vos
            précédentes réalisations.
          </p>
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out">
            Voir l'historique des tâches
          </button>
        </div>

        <div className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 w-full max-w-sm transform transition-transform hover:scale-105">
          <div className="flex items-center mb-4">
            <svg
              className="w-8 h-8 text-indigo-500 dark:text-indigo-400 mr-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Historique des tâches
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Consultez l'historique complet de vos tâches et revenez sur vos
            précédentes réalisations.
          </p>
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out">
            Voir l'historique des tâches
          </button>
        </div>
      </Section>

      <FAQSection />
    </main>
  );
}
