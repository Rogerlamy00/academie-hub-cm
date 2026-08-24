import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserRound,
  School,
  BookOpen,
  CalendarRange,
  ClipboardList,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  NotebookPen,
  CheckSquare,
  CalendarClock,
  Wallet,
  Bell,
  BarChart3,
  Settings,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import type { AppRole } from "@/lib/roles";

export type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
  roles: AppRole[];
  /** Module prévu dans une phase ultérieure. */
  soon?: boolean;
};

export type NavGroup = { title: string; items: NavItem[] };

const ADMINS: AppRole[] = ["admin", "super_admin"];

export const NAV_GROUPS: NavGroup[] = [
  {
    title: "Pilotage",
    items: [
      { label: "Tableau de bord", to: "/dashboard", icon: LayoutDashboard, roles: ADMINS },
      { label: "Mon espace", to: "/enseignant", icon: LayoutDashboard, roles: ["teacher"] },
      { label: "Mon espace", to: "/eleve", icon: LayoutDashboard, roles: ["student"] },
      { label: "Mon espace", to: "/parent", icon: LayoutDashboard, roles: ["parent"] },
      { label: "Statistiques", to: "/statistiques", icon: BarChart3, roles: ADMINS, soon: true },
    ],
  },
  {
    title: "Vie scolaire",
    items: [
      { label: "Élèves", to: "/eleves", icon: Users, roles: ADMINS, soon: true },
      { label: "Enseignants", to: "/enseignants", icon: GraduationCap, roles: ADMINS, soon: true },
      { label: "Parents", to: "/parents", icon: UserRound, roles: ADMINS, soon: true },
      { label: "Classes", to: "/classes", icon: School, roles: ADMINS, soon: true },
      { label: "Matières", to: "/matieres", icon: BookOpen, roles: ADMINS, soon: true },
      {
        label: "Année scolaire",
        to: "/annees-scolaires",
        icon: CalendarRange,
        roles: ADMINS,
        soon: true,
      },
    ],
  },
  {
    title: "Pédagogie",
    items: [
      {
        label: "Évaluations",
        to: "/evaluations",
        icon: ClipboardList,
        roles: [...ADMINS, "teacher"],
        soon: true,
      },
      {
        label: "Notes",
        to: "/notes",
        icon: FileSpreadsheet,
        roles: [...ADMINS, "teacher"],
        soon: true,
      },
      { label: "Bulletins", to: "/bulletins", icon: FileText, roles: ADMINS, soon: true },
      {
        label: "Documents",
        to: "/documents",
        icon: FolderOpen,
        roles: [...ADMINS, "teacher", "student", "parent"],
        soon: true,
      },
      {
        label: "Devoirs",
        to: "/devoirs",
        icon: NotebookPen,
        roles: [...ADMINS, "teacher", "student"],
        soon: true,
      },
      {
        label: "Assiduité",
        to: "/assiduite",
        icon: CheckSquare,
        roles: [...ADMINS, "teacher"],
        soon: true,
      },
      {
        label: "Emploi du temps",
        to: "/emploi-du-temps",
        icon: CalendarClock,
        roles: [...ADMINS, "teacher", "student", "parent"],
        soon: true,
      },
    ],
  },
  {
    title: "Administration",
    items: [
      {
        label: "Paiements",
        to: "/paiements",
        icon: Wallet,
        roles: [...ADMINS, "parent"],
        soon: true,
      },
      {
        label: "Notifications",
        to: "/notifications",
        icon: Bell,
        roles: [...ADMINS, "teacher", "student", "parent"],
        soon: true,
      },
      { label: "Utilisateurs", to: "/utilisateurs", icon: ShieldCheck, roles: ADMINS, soon: true },
      { label: "Paramètres", to: "/parametres", icon: Settings, roles: ADMINS, soon: true },
      { label: "Journal d'audit", to: "/audit", icon: ShieldCheck, roles: ["super_admin"], soon: true },
    ],
  },
];

export function navGroupsForRoles(roles: AppRole[]): NavGroup[] {
  return NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => item.roles.some((r) => roles.includes(r))),
  })).filter((group) => group.items.length > 0);
}
