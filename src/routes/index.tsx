import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, BookOpen, LineChart, Users, ShieldCheck, CalendarRange } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TSS Platform — Gestion scolaire des cours de répétition" },
      {
        name: "description",
        content:
          "Plateforme camerounaise de gestion des cours de répétition : inscriptions, notes, moyennes, bulletins, assiduité et paiements.",
      },
      { property: "og:title", content: "TSS Platform — Gestion scolaire" },
      {
        property: "og:description",
        content:
          "Élèves, parents, enseignants et administration réunis sur une plateforme unique et sécurisée.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  {
    icon: Users,
    title: "Inscriptions centralisées",
    text: "Élèves, parents et enseignants gérés depuis un dossier unique par année académique.",
  },
  {
    icon: BookOpen,
    title: "Programme camerounais",
    text: "De la 6ème à la Terminale, trimestres et séquences conformes au système national.",
  },
  {
    icon: LineChart,
    title: "Notes et moyennes",
    text: "Coefficients par matière, moyennes séquentielles et trimestrielles, bulletins prêts à imprimer.",
  },
  {
    icon: CalendarRange,
    title: "Assiduité",
    text: "Présences, absences et retards suivis séance par séance.",
  },
  {
    icon: ShieldCheck,
    title: "Sécurité par rôle",
    text: "Chaque utilisateur ne voit que les informations qui le concernent.",
  },
  {
    icon: GraduationCap,
    title: "Préparation aux examens",
    text: "BEPC, Probatoire et Baccalauréat : progression suivie tout au long de l'année.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="size-5" aria-hidden />
          </span>
          <span className="font-display text-lg font-semibold">TSS Platform</span>
        </div>
        <Button asChild>
          <Link to="/auth">Se connecter</Link>
        </Button>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-10 sm:pt-16">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Groupe de cours de répétition · Cameroun
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            La gestion numérique complète de votre groupe de répétition
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground">
            Inscriptions, classes, notes, moyennes, bulletins, assiduité, documents et paiements —
            réunis dans un espace sécurisé pour l'administration, les enseignants, les élèves et
            leurs parents.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/auth">Accéder à mon espace</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/auth">Créer un compte</Link>
            </Button>
          </div>
        </section>

        <section className="border-t bg-muted/30">
          <div className="mx-auto grid max-w-6xl gap-5 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <article key={f.title} className="surface-panel p-6">
                <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="size-5" aria-hidden />
                </span>
                <h2 className="mt-4 font-display text-lg font-semibold">{f.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-6 py-10 text-xs text-muted-foreground">
        © {new Date().getFullYear()} TSS Platform · Préparation BEPC · Probatoire · Baccalauréat
      </footer>
    </div>
  );
}
