import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";
import type { AppRole } from "@/lib/roles";

/** Session Supabase courante, tenue à jour côté client. */
export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, user: session?.user ?? null, loading };
}

export type CurrentUser = {
  id: string;
  email: string | null;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  roles: AppRole[];
};

/** Profil + rôles de l'utilisateur connecté (source de vérité : la base). */
export function useCurrentUser(userId: string | undefined) {
  return useQuery({
    queryKey: ["current-user", userId],
    enabled: Boolean(userId),
    staleTime: 60_000,
    queryFn: async (): Promise<CurrentUser | null> => {
      if (!userId) return null;
      const [{ data: profile, error: pErr }, { data: roles, error: rErr }] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, first_name, last_name, email, avatar_url")
          .eq("id", userId)
          .maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", userId),
      ]);
      if (pErr) throw pErr;
      if (rErr) throw rErr;
      return {
        id: userId,
        email: profile?.email ?? null,
        firstName: profile?.first_name ?? "",
        lastName: profile?.last_name ?? "",
        avatarUrl: profile?.avatar_url ?? null,
        roles: (roles ?? []).map((r) => r.role as AppRole),
      };
    },
  });
}
