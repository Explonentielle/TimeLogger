import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Section } from "./Section";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "Comment puis-je suivre mes tâches sur Easy Log ?",
    answer:
      "Sur Easy Log, vous pouvez suivre vos tâches en les associant à des projets et en enregistrant le temps passé sur chacune d'elles. Utilisez la section 'Gestion des issues' pour accéder à vos tâches et les mettre à jour.",
  },
  {
    question: "Puis-je obtenir des rapports détaillés de mon activité ?",
    answer:
      "Oui, Easy Log vous permet de générer des rapports détaillés sur le temps que vous avez passé sur chaque tâche, ainsi que sur vos projets. Ces rapports peuvent être consultés à tout moment dans la section 'Rapports d'activité'.",
  },
  {
    question: "Comment puis-je intégrer mon dépôt Git à Easy Log ?",
    answer:
      "Vous pouvez connecter votre dépôt Git à Easy Log via l'intégration Git. Cela vous permettra de suivre vos commits directement dans vos tâches et d'associer vos contributions à vos projets.",
  },
  {
    question: "Est-ce que mes données sont sécurisées sur Easy Log ?",
    answer:
      "Chez Easy Log, la sécurité des données est une priorité. Toutes vos informations sont stockées de manière sécurisée et nous utilisons des protocoles de cryptage pour protéger vos données sensibles.",
  },
  {
    question: "Comment puis-je commencer à utiliser Easy Log gratuitement ?",
    answer:
      "Vous pouvez commencer à utiliser Easy Log gratuitement en créant un compte. La version gratuite propose toutes les fonctionnalités de base nécessaires pour la gestion de vos projets et tâches.",
  },
  {
    question: "Y a-t-il une version premium d'Easy Log avec plus de fonctionnalités ?",
    answer:
      "Oui, Easy Log propose une version premium qui offre des fonctionnalités avancées telles que des rapports supplémentaires, une intégration plus poussée avec Git, et un support prioritaire.",
  },
  {
    question: "Puis-je suivre mes équipes sur Easy Log ?",
    answer:
      "Oui, Easy Log permet de collaborer avec des équipes. Vous pouvez assigner des tâches, suivre le temps de chacun et obtenir une vue d'ensemble des performances de l'équipe.",
  },
  {
    question: "Comment obtenir de l'aide si j'ai des problèmes sur Easy Log ?",
    answer:
      "Si vous avez besoin d'aide, vous pouvez consulter notre centre d'assistance ou contacter notre équipe de support via l'interface de l'application. Nous sommes disponibles pour répondre à toutes vos questions.",
  },
];

export const FAQSection = () => {
  return (
    <Section className="flex w-full flex-row items-start gap-4 max-lg:flex-col max-lg:items-center">
      <div className="flex-1 max-lg:text-center">
        <h2 className="text-xl font-bold text-primary">FAQ</h2>
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
      </div>
      <div className="w-full max-w-lg flex-1 text-left">
        <Accordion type="multiple">
          {FAQS.map((faq, index) => (
            <AccordionItem
              value={faq.question}
              key={faq.question}
              className="text-left"
            >
              <AccordionTrigger>
                <span className="text-left">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
};
