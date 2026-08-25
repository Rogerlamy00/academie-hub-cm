import { createFileRoute } from "@tanstack/react-router";

import { ProtectedPage } from "@/components/layout/protected-page";
import { EmptyState } from "@/components/common/states";

export const Route = createFileRoute("/_authenticated/eleve")({
  head: () => ({
    meta: [
      { title: "Espace élève — TSS Platform" },
      {
        name: "description",
        content: "Consultez votre classe, vos notes, vos moyennes et vos bulletins scolaires.",
      },
      { property: "og:title", content: "Espace élève — TSS Platform" },
      { property: "og:description", content: "Suivi scolaire personnel de l'élève." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudentPage,
});

function StudentPage() {
  return (
    <ProtectedPage title="Espace élève" subtitle="Votre scolarité en un coup d'œil">
      {(user) => (
        <div className="space-y-6 p-4 sm:p-6">
          <div className="surface-panel p-6">
            <h2 className="font-display text-lg font-semibold">
              Bonjour {user.firstName || "cher élève"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Votre inscription, vos notes et vos bulletins apparaîtront ici.
            </p>
          </div>
          <EmptyState
            title="Aucune donnée scolaire disponible"
            description="Dès votre inscription en classe par l'administration, votre suivi s'affichera automatiquement."
          />
        </div>
      )}
    </ProtectedPage>
  );
}
