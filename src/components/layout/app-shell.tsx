import { useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Bell, GraduationCap, LogOut, Menu, Moon, Sun, User } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ROLE_LABELS, type AppRole } from "@/lib/roles";
import { navGroupsForRoles } from "./nav-config";
import type { CurrentUser } from "@/hooks/use-session";

function SidebarNav({ roles, onNavigate }: { roles: AppRole[]; onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const groups = navGroupsForRoles(roles);

  return (
    <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-4">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            {group.title}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.to;
              const content = (
                <span className="flex w-full items-center gap-3">
                  <item.icon className="size-4 shrink-0" aria-hidden />
                  <span className="truncate">{item.label}</span>
                  {item.soon ? (
                    <span className="ml-auto rounded bg-sidebar-accent px-1.5 py-0.5 text-[10px] uppercase text-sidebar-foreground/60">
                      bientôt
                    </span>
                  ) : null}
                </span>
              );
              const className = cn(
                "flex items-center rounded-md px-3 py-2 text-sm text-sidebar-foreground/85 transition-colors",
                active
                  ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                  : "hover:bg-sidebar-accent/60",
                item.soon && "cursor-not-allowed opacity-60",
              );
              return (
                <li key={item.to}>
                  {item.soon ? (
                    <span className={className} aria-disabled>
                      {content}
                    </span>
                  ) : (
                    <Link to={item.to} className={className} onClick={onNavigate}>
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-4">
      <span className="grid size-9 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <GraduationCap className="size-5" aria-hidden />
      </span>
      <div className="leading-tight">
        <p className="font-display text-base font-semibold text-sidebar-foreground">TSS Platform</p>
        <p className="text-[11px] text-sidebar-foreground/60">Cours de répétition</p>
      </div>
    </div>
  );
}

export function AppShell({
  user,
  title,
  subtitle,
  actions,
  children,
}: {
  user: CurrentUser;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const initials =
    `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase() ||
    (user.email ?? "?").charAt(0).toUpperCase();

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    toast.success("Vous êtes déconnecté.");
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 flex-col bg-sidebar lg:flex">
        <Brand />
        <SidebarNav roles={user.roles} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b bg-background/85 px-4 py-3 backdrop-blur sm:px-6">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Ouvrir le menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-sidebar p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <Brand />
              <SidebarNav roles={user.roles} onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-semibold">{title}</h1>
            {subtitle ? (
              <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>

          <div className="flex items-center gap-1">
            {actions}
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Changer de thème">
              {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell className="size-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <span className="grid size-8 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {initials}
                  </span>
                  <span className="hidden text-left sm:block">
                    <span className="block text-sm leading-tight">
                      {user.firstName || user.email}
                    </span>
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuLabel className="space-y-1">
                  <p className="text-sm font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="truncate text-xs font-normal text-muted-foreground">{user.email}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {user.roles.map((r) => (
                      <Badge key={r} variant="secondary" className="text-[10px]">
                        {ROLE_LABELS[r]}
                      </Badge>
                    ))}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                  <User className="mr-2 size-4" /> Mon profil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 size-4" /> Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
