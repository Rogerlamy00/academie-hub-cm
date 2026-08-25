import { createFileRoute } from "@tanstack/react-router";

import { ProtectedPage } from "@/components/layout/protected-page";
import { EmptyState } from "@/components/common/states";

export const Route = createFileRoute("/_authenticated/enseignant")({
  head: () => ({
    meta: [
      { title: "Espace enseignant — TSS Platform" },
      {
        name: "description",
        content: "Retrouvez vos classes, vos matières et la saisie des notes de vos élèves.",
      },
      { property: "og:title", content: "Espace enseignant — TSS Platform" },
      {
        property: "og:description",
        content: "Classes, matières et évaluations de l'enseignant.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeacherPage,
});

function TeacherPage() {
  return (
    <ProtectedPage title="Espace enseignant" subtitle="Vos classes et vos matières">
      {(user) => (
        <div className="space-y-6 p-4 sm:p-6">
          <div className="surface-panel p-6">
            <h2 className="font-display text-lg font-semibold">
              Bonjour {user.firstName || "cher enseignant"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Vos affectations de classes et matières seront listées ici dès leur attribution par
              l'administration.
            </p>
          </div>
          <EmptyState
            title="Aucune affectation pour le moment"
            description="La saisie des notes et le suivi des séquences seront activés dans la prochaine phase."
          />
        </div>
      )}
    </ProtectedPage>
  );
}
