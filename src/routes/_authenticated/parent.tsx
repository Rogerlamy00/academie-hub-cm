import { createFileRoute } from "@tanstack/react-router";

import { ProtectedPage } from "@/components/layout/protected-page";
import { EmptyState } from "@/components/common/states";

export const Route = createFileRoute("/_authenticated/parent")({
  head: () => ({
    meta: [
      { title: "Espace parent — TSS Platform" },
      {
        name: "description",
        content: "Suivez la scolarité de vos enfants : notes, assiduité, bulletins et paiements.",
      },
      { property: "og:title", content: "Espace parent — TSS Platform" },
      { property: "og:description", content: "Suivi scolaire des enfants pour les parents." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ParentPage,
});

function ParentPage() {
  return (
    <ProtectedPage title="Espace parent" subtitle="Le suivi de vos enfants">
      {(user) => (
        <div className="space-y-6 p-4 sm:p-6">
          <div className="surface-panel p-6">
            <h2 className="font-display text-lg font-semibold">
              Bonjour {user.firstName || "cher parent"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Les enfants rattachés à votre compte apparaîtront ici avec leur suivi scolaire.
            </p>
          </div>
          <EmptyState
            title="Aucun enfant rattaché"
            description="Contactez l'administration pour associer vos enfants à votre compte parent."
          />
        </div>
      )}
    </ProtectedPage>
  );
}
