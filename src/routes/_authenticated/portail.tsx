import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { LoadingState, ErrorState } from "@/components/common/states";
import { useCurrentUser, useSession } from "@/hooks/use-session";
import { homeRouteForRoles } from "@/lib/roles";

export const Route = createFileRoute("/_authenticated/portail")({
  head: () => ({
    meta: [
      { title: "Portail — TSS Platform" },
      {
        name: "description",
        content: "Redirection vers votre espace personnel TSS Platform selon votre rôle.",
      },
      { property: "og:title", content: "Portail — TSS Platform" },
      {
        property: "og:description",
        content: "Accédez à votre espace élève, parent, enseignant ou administration.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortailPage,
});

function PortailPage() {
  const navigate = useNavigate();
  const { user, loading } = useSession();
  const { data, isLoading, isError, refetch } = useCurrentUser(user?.id);

  useEffect(() => {
    if (!data) return;
    navigate({ to: homeRouteForRoles(data.roles) as "/dashboard", replace: true });
  }, [data, navigate]);

  if (isError) {
    return (
      <div className="p-6">
        <ErrorState message="Impossible de déterminer votre espace." onRetry={() => refetch()} />
      </div>
    );
  }

  if (loading || isLoading || data) return <LoadingState label="Ouverture de votre espace…" />;

  return <LoadingState />;
}
