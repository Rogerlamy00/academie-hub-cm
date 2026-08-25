import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Users, GraduationCap, School, BookOpen } from "lucide-react";

import { ProtectedPage } from "@/components/layout/protected-page";
import { StatCard } from "@/components/common/stat-card";
import { CardsSkeleton, ErrorState } from "@/components/common/states";
import { supabase } from "@/integrations/supabase/client";
import { isAdminRole } from "@/lib/roles";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — TSS Platform" },
      {
        name: "description",
        content:
          "Vue d'ensemble de l'établissement : élèves, enseignants, classes et matières suivis en temps réel.",
      },
      { property: "og:title", content: "Tableau de bord — TSS Platform" },
      {
        property: "og:description",
        content: "Pilotage administratif du groupe de cours de répétition.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function useOverview() {
  return useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const count = async (table: "student_profiles" | "teacher_profiles" | "classes" | "subjects") => {
        const { count: c, error } = await supabase
          .from(table)
          .select("id", { count: "exact", head: true });
        if (error) throw error;
        return c ?? 0;
      };
      const [students, teachers, classes, subjects] = await Promise.all([
        count("student_profiles"),
        count("teacher_profiles"),
        count("classes"),
        count("subjects"),
      ]);
      return { students, teachers, classes, subjects };
    },
  });
}

function DashboardPage() {
  return (
    <ProtectedPage title="Tableau de bord" subtitle="Vue d'ensemble de l'établissement">
      {(user) =>
        isAdminRole(user.roles) ? (
          <Overview />
        ) : (
          <div className="p-6">
            <ErrorState message="Cet espace est réservé à l'administration." />
          </div>
        )
      }
    </ProtectedPage>
  );
}

function Overview() {
  const { data, isLoading, isError, refetch } = useOverview();

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {isLoading ? <CardsSkeleton /> : null}
      {isError ? <ErrorState onRetry={() => refetch()} /> : null}
      {data ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Élèves inscrits" value={data.students} icon={Users} />
          <StatCard label="Enseignants" value={data.teachers} icon={GraduationCap} tone="accent" />
          <StatCard label="Classes" value={data.classes} icon={School} tone="success" />
          <StatCard label="Matières" value={data.subjects} icon={BookOpen} />
        </div>
      ) : null}
      <div className="surface-panel p-6">
        <h2 className="font-display text-lg font-semibold">Prochaines étapes</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La phase 1 met en place la base de données, la sécurité par rôle et la navigation. Les
          modules notes, bulletins, assiduité et paiements arrivent dans les phases suivantes.
        </p>
      </div>
    </div>
  );
}
