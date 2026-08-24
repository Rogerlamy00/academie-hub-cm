/** Rôles applicatifs — miroir de l'enum `app_role` en base. */
export const APP_ROLES = ["super_admin", "admin", "teacher", "student", "parent"] as const;

export type AppRole = (typeof APP_ROLES)[number];

export const ROLE_LABELS: Record<AppRole, string> = {
  super_admin: "Super administrateur",
  admin: "Administrateur",
  teacher: "Enseignant",
  student: "Élève",
  parent: "Parent",
};

export const isAdminRole = (roles: AppRole[]) =>
  roles.includes("admin") || roles.includes("super_admin");

/** Route d'accueil après connexion, selon le rôle principal. */
export function homeRouteForRoles(roles: AppRole[]): string {
  if (isAdminRole(roles)) return "/dashboard";
  if (roles.includes("teacher")) return "/enseignant";
  if (roles.includes("parent")) return "/parent";
  return "/eleve";
}
