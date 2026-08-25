import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { ErrorState, LoadingState } from "@/components/common/states";
import { useCurrentUser, useSession } from "@/hooks/use-session";
import type { CurrentUser } from "@/hooks/use-session";

/**
 * Coquille commune des pages protégées : charge le profil + rôles,
 * puis rend l'AppShell autour du contenu.
 */
export function ProtectedPage({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: (user: CurrentUser) => ReactNode;
}) {
  const { user: authUser, loading } = useSession();
  const { data, isLoading, isError, refetch } = useCurrentUser(authUser?.id);

  if (loading || isLoading) {
    return <LoadingState label="Chargement de votre espace…" />;
  }

  if (isError || !data) {
    return (
      <div className="p-6">
        <ErrorState message="Impossible de charger votre profil." onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <AppShell user={data} title={title} subtitle={subtitle} actions={actions}>
      {children(data)}
    </AppShell>
  );
}
