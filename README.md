# EduSpark Platform

Tu es un architecte logiciel senior, ingénieur full-stack, expert UX/UI et spécialiste des plateformes EdTech.
Ta mission est de concevoir et développer une plateforme web professionnelle appelée provisoirement "TSS Platform", destinée à la gestion numérique d'un groupe camerounais de cours de répétition.
==================================================
1. CONTEXTE DU PROJET
==================================================
Le groupe dispense des cours de répétition en présentiel aux élèves du secondaire au Cameroun.
Les classes couvertes vont de :
- 6ème
- 5ème
- 4ème
- 3ème
- 2nde
- 1ère
- Terminale
La plateforme doit accompagner les élèves dans leur préparation scolaire et aux examens :
- BEPC
- Probatoire
- Baccalauréat
- examens et évaluations des classes intermédiaires.
L'objectif est de numériser progressivement le fonctionnement du groupe.
La plateforme doit permettre à l'administration, aux enseignants, aux élèves et aux parents de gérer et consulter toutes les informations pédagogiques et administratives.
Il ne s'agit PAS d'un simple site vitrine.
Il s'agit d'une véritable application web de gestion scolaire/EdTech avec authentification, rôles, permissions, base de données, tableaux de bord, gestion des notes, bulletins PDF, documents, devoirs, assiduité, paiements, notifications et statistiques.
==================================================
2. OBJECTIF PRINCIPAL
==================================================
Créer une application moderne, professionnelle, responsive et sécurisée permettant de centraliser :
- les élèves ;
- les parents ;
- les enseignants ;
- les administrateurs ;
- les classes ;
- les matières ;
- les inscriptions ;
- les années scolaires ;
- les trimestres ;
- les séquences ;
- les évaluations ;
- les notes ;
- les moyennes ;
- les rangs ;
- les bulletins ;
- les documents pédagogiques ;
- les TD ;
- les devoirs ;
- les corrections ;
- les examens blancs ;
- l'assiduité ;
- les retards ;
- les emplois du temps ;
- les salles ;
- les paiements ;
- les reçus ;
- les annonces ;
- les notifications ;
- les statistiques.
L'application doit être conçue avec une architecture propre, modulaire et évolutive.
==================================================
3. IMPORTANT : NE PAS CRÉER UN SIMPLE PROTOTYPE
==================================================
Je veux une application réellement fonctionnelle.
Ne te limite pas à générer des pages statiques.
Toutes les fonctionnalités principales doivent être reliées à une vraie base de données.
Les formulaires doivent réellement enregistrer les données.
Les tableaux doivent récupérer les données de la base.
Les modifications doivent être persistées.
Les suppressions doivent être sécurisées.
Les permissions doivent être réellement appliquées côté backend.
Les statistiques doivent être calculées à partir des données réelles.
Les bulletins doivent être générés à partir des résultats réels.
==================================================
4. STACK TECHNIQUE
==================================================
Pour cette première version, utilise une architecture moderne adaptée à Lovable :
Frontend :
- React
- TypeScript
- Tailwind CSS
- composants UI modernes
- responsive design
- Lucide Icons
- graphiques avec Recharts ou équivalent
Backend / données :
- Supabase
- PostgreSQL
- Supabase Auth
- Row Level Security (RLS)
- Storage pour les documents et fichiers
Architecture :
- composants réutilisables ;
- séparation claire frontend/backend ;
- services ;
- hooks ;
- validation ;
- gestion centralisée des erreurs ;
- permissions basées sur les rôles.
Prépare également l'architecture afin qu'une API puisse être ajoutée ultérieurement.
==================================================
5. IDENTITÉ VISUELLE
==================================================
Créer une identité visuelle professionnelle adaptée à une plateforme éducative camerounaise moderne.
Le design doit être :
- élégant ;
- sobre ;
- moderne ;
- professionnel ;
- rassurant ;
- très lisible ;
- mobile-first.
Éviter une interface trop colorée ou enfantine.
Utiliser une hiérarchie visuelle claire.
Prévoir :
- sidebar desktop ;
- navigation mobile ;
- header ;
- breadcrumbs ;
- cartes statistiques ;
- tableaux ;
- filtres ;
- recherche ;
- modales ;
- notifications ;
- états de chargement ;
- états vides ;
- messages d'erreur ;
- confirmations d'action.
Prévoir également le mode sombre si cela ne complexifie pas inutilement l'application.
==================================================
6. RÔLES UTILISATEURS
==================================================
Créer les rôles suivants :
1. SUPER_ADMIN
2. ADMIN
3. TEACHER
4. STUDENT
5. PARENT
Les permissions doivent être réellement appliquées.
--------------------------------------------------
SUPER_ADMIN
--------------------------------------------------
Accès complet :
- utilisateurs ;
- rôles ;
- permissions ;
- configuration ;
- années scolaires ;
- classes ;
- matières ;
- élèves ;
- enseignants ;
- parents ;
- notes ;
- bulletins ;
- documents ;
- assiduité ;
- paiements ;
- statistiques ;
- audit logs.
--------------------------------------------------
ADMIN
--------------------------------------------------
Gestion opérationnelle :
- élèves ;
- enseignants ;
- parents ;
- classes ;
- matières ;
- inscriptions ;
- évaluations ;
- notes ;
- bulletins ;
- documents ;
- assiduité ;
- paiements ;
- notifications ;
- statistiques.
--------------------------------------------------
TEACHER
--------------------------------------------------
Accès uniquement aux classes et matières qui lui sont attribuées.
Il peut :
- consulter ses classes ;
- consulter ses élèves ;
- créer des évaluations ;
- saisir les notes ;
- modifier les notes selon les permissions ;
- déposer des cours ;
- déposer des TD ;
- déposer des devoirs ;
- déposer des corrections ;
- gérer l'assiduité ;
- consulter les statistiques de ses classes.
--------------------------------------------------
STUDENT
--------------------------------------------------
Il peut :
- consulter son tableau de bord ;
- consulter son profil ;
- consulter ses notes ;
- consulter ses moyennes ;
- consulter ses rangs ;
- consulter son évolution ;
- télécharger ses bulletins ;
- télécharger les documents auxquels il a accès ;
- consulter les devoirs ;
- déposer des devoirs si cette fonctionnalité est activée ;
- consulter son assiduité ;
- consulter son emploi du temps ;
- recevoir les notifications.
Il ne peut jamais modifier ses notes.
--------------------------------------------------
PARENT
--------------------------------------------------
Un parent peut être associé à plusieurs élèves.
Il peut :
- consulter ses enfants ;
- consulter leurs résultats ;
- consulter leurs bulletins ;
- consulter leur assiduité ;
- consulter les documents ;
- consulter les paiements ;
- télécharger les reçus ;
- recevoir les notifications.
Il ne peut jamais modifier les résultats.
==================================================
7. ANNÉE SCOLAIRE CAMEROUNAISE
==================================================
Le système doit prendre en compte le fonctionnement suivant :
Une année scolaire comporte 3 trimestres.
Chaque trimestre comporte 2 séquences.
Donc :
Trimestre 1 :
- Séquence 1
- Séquence 2
Trimestre 2 :
- Séquence 3
- Séquence 4
Trimestre 3 :
- Séquence 5
- Séquence 6
Ne jamais coder ces valeurs en dur dans les composants.
Elles doivent être gérées dynamiquement par la base de données.
Structure logique :
Academic Year
    ↓
Term
    ↓
Sequence
Exemple :
2026/2027
    ├── Trimestre 1
    │      ├── Séquence 1
    │      └── Séquence 2
    │
    ├── Trimestre 2
    │      ├── Séquence 3
    │      └── Séquence 4
    │
    └── Trimestre 3
           ├── Séquence 5
           └── Séquence 6
==================================================
8. STRUCTURE DES CLASSES
==================================================
Prévoir les niveaux :
- 6ème
- 5ème
- 4ème
- 3ème
- 2nde
- 1ère
- Terminale
Prévoir également les séries lorsque nécessaire :
- A
- C
- D
- autres séries configurables.
Ne pas supposer que toutes les classes ont les mêmes matières.
Les matières doivent être configurables par classe.
==================================================
9. MODULE ADMINISTRATION
==================================================
Créer un dashboard administrateur professionnel.
Afficher notamment :
- nombre total d'élèves ;
- nombre d'enseignants ;
- nombre de classes ;
- nombre de parents ;
- nombre d'évaluations ;
- taux de présence ;
- moyenne générale ;
- paiements ;
- activités récentes.
Ajouter des graphiques.
Créer les menus :
- Dashboard
- Élèves
- Enseignants
- Parents
- Classes
- Matières
- Années scolaires
- Trimestres
- Séquences
- Évaluations
- Notes
- Bulletins
- Documents
- Devoirs
- Assiduité
- Emploi du temps
- Paiements
- Notifications
- Statistiques
- Utilisateurs
- Paramètres
- Journal d'audit
==================================================
10. MODULE ÉLÈVES
==================================================
Créer une gestion complète des élèves.
Informations :
- matricule ;
- nom ;
- prénom ;
- sexe ;
- date de naissance ;
- lieu de naissance ;
- photo ;
- téléphone ;
- email ;
- établissement scolaire ;
- classe ;
- série ;
- année scolaire ;
- statut.
Prévoir :
- création ;
- modification ;
- consultation ;
- archivage ;
- recherche ;
- filtrage ;
- pagination.
Chaque élève doit avoir une fiche détaillée.
==================================================
11. INSCRIPTIONS
==================================================
Un élève doit être inscrit pour une année scolaire donnée.
Exemple :
2026/2027 → 3ème
L'historique doit être conservé.
Ne pas écraser les anciennes inscriptions.
==================================================
12. MODULE ENSEIGNANTS
==================================================
Informations :
- matricule ;
- nom ;
- prénom ;
- téléphone ;
- email ;
- spécialité ;
- matières ;
- classes affectées ;
- statut.
Un enseignant peut être affecté à plusieurs classes et matières.
==================================================
13. MODULE MATIÈRES
==================================================
Créer une gestion configurable des matières.
Exemples :
- Mathématiques
- Français
- Anglais
- Physique
- Chimie
- SVT
- Histoire
- Géographie
- Informatique
- Philosophie
- etc.
Les coefficients doivent être configurables.
==================================================
14. MODULE ÉVALUATIONS
==================================================
Types :
- Interrogation
- Devoir
- Composition
- Test
- Examen blanc
- Autre
Une évaluation doit contenir :
- classe ;
- matière ;
- séquence ;
- titre ;
- type ;
- date ;
- note maximale ;
- coefficient ;
- description.
==================================================
15. MODULE NOTES
==================================================
Permettre aux enseignants autorisés de saisir les notes.
Chaque note doit être associée à :
- élève ;
- évaluation ;
- matière ;
- classe ;
- séquence.
Valider :
- note >= 0 ;
- note <= note maximale.
Prévoir une saisie rapide des notes sous forme de tableau.
Exemple :
Élève | Note | Observation
Prévoir sauvegarde individuelle et sauvegarde en masse.
Afficher les erreurs de validation immédiatement.
==================================================
16. CALCUL DES MOYENNES
==================================================
Créer un service centralisé de calcul.
Calculer :
- moyenne par matière ;
- moyenne de séquence ;
- moyenne trimestrielle ;
- moyenne générale ;
- rang ;
- évolution des résultats.
Ne pas dupliquer les règles de calcul dans plusieurs composants.
Les règles doivent être centralisées.
Les coefficients doivent être pris en compte.
Prévoir une configuration future des règles de calcul.
==================================================
17. BULLETINS
==================================================
Créer deux types :
1. Bulletin séquentiel
2. Bulletin trimestriel
Le bulletin doit afficher :
- identité du groupe ;
- année scolaire ;
- identité de l'élève ;
- classe ;
- période ;
- matières ;
- notes ;
- moyennes ;
- coefficients ;
- moyennes pondérées ;
- moyenne générale ;
- rang ;
- nombre d'élèves ;
- appréciations ;
- observations générales.
Prévoir génération PDF.
Prévoir téléchargement individuel.
Prévoir génération en masse pour une classe.
==================================================
18. DOCUMENTS PÉDAGOGIQUES
==================================================
Créer un espace documentaire.
Catégories :
- Cours
- TD
- Devoir
- Correction
- Fiche de révision
- Examen
- Examen blanc
- Document administratif
- Autre
Chaque document doit avoir :
- titre ;
- description ;
- catégorie ;
- matière ;
- classe ;
- séquence ;
- auteur ;
- fichier ;
- date ;
- visibilité.
Les fichiers doivent être stockés dans Supabase Storage.
Les permissions de téléchargement doivent être vérifiées.
==================================================
19. DEVOIRS
==================================================
Créer un module permettant aux enseignants de publier des devoirs.
Informations :
- titre ;
- description ;
- classe ;
- matière ;
- séquence ;
- date de publication ;
- date limite ;
- fichier.
Les élèves doivent pouvoir consulter les devoirs.
Prévoir ultérieurement le dépôt des réponses.
==================================================
20. ASSIDUITÉ
==================================================
Gérer :
- présent ;
- absent justifié ;
- absent non justifié ;
- retard.
L'enseignant doit pouvoir effectuer une saisie rapide pour toute la classe.
Afficher pour chaque élève :
- nombre de présences ;
- absences justifiées ;
- absences non justifiées ;
- retards ;
- taux de présence.
==================================================
21. EMPLOI DU TEMPS
==================================================
Créer un module permettant de gérer :
- classe ;
- matière ;
- enseignant ;
- salle ;
- jour ;
- heure de début ;
- heure de fin.
Détecter les conflits :
- enseignant ;
- classe ;
- salle.
Afficher l'emploi du temps sous forme de calendrier/tableau.
==================================================
22. PAIEMENTS
==================================================
Créer un module de gestion financière.
Informations :
- élève ;
- année scolaire ;
- montant ;
- type de frais ;
- date ;
- mode de paiement ;
- référence ;
- statut.
Prévoir les modes :
- Espèces
- Mobile Money
- Virement bancaire
- Autre
Créer les reçus PDF.
Prévoir un historique des paiements.
==================================================
23. NOTIFICATIONS
==================================================
Créer un système de notifications.
Types :
- nouvelle note ;
- nouveau document ;
- nouveau devoir ;
- bulletin disponible ;
- paiement ;
- annonce ;
- absence ;
- système.
Afficher les notifications non lues.
==================================================
24. ANNONCES
==================================================
Les administrateurs peuvent publier des annonces.
Ciblage :
- tous ;
- enseignants ;
- élèves ;
- parents ;
- classe spécifique.
==================================================
25. TABLEAU DE BORD ÉLÈVE
==================================================
Créer un dashboard très simple et motivant.
Afficher :
- moyenne actuelle ;
- rang ;
- évolution ;
- dernières notes ;
- prochains devoirs ;
- derniers documents ;
- assiduité ;
- notifications.
Ajouter un graphique d'évolution des résultats.
==================================================
26. TABLEAU DE BORD PARENT
==================================================
Le parent doit pouvoir sélectionner l'un de ses enfants.
Afficher :
- moyenne ;
- rang ;
- évolution ;
- dernières notes ;
- assiduité ;
- bulletins ;
- paiements ;
- notifications.
==================================================
27. TABLEAU DE BORD ENSEIGNANT
==================================================
Afficher :
- classes ;
- nombre d'élèves ;
- évaluations ;
- notes à saisir ;
- devoirs ;
- documents ;
- assiduité ;
- statistiques.
==================================================
28. STATISTIQUES
==================================================
Créer des statistiques utiles.
Administration :
- moyenne générale par classe ;
- taux de réussite ;
- taux de présence ;
- évolution des résultats ;
- meilleures matières ;
- matières nécessitant un accompagnement ;
- distribution des moyennes.
Enseignant :
- moyenne de sa classe ;
- progression ;
- élèves en difficulté ;
- taux de participation.
Élève :
- évolution personnelle ;
- comparaison entre séquences ;
- matières fortes ;
- matières faibles.
==================================================
29. RECHERCHE
==================================================
Ajouter une recherche globale.
Recherche possible :
- élèves ;
- enseignants ;
- classes ;
- documents ;
- évaluations.
Prévoir filtres avancés.
==================================================
30. SÉCURITÉ
==================================================
Implémenter réellement :
- authentification sécurisée ;
- gestion des sessions ;
- contrôle des rôles ;
- Row Level Security Supabase ;
- validation des données ;
- protection des fichiers ;
- contrôle des permissions ;
- journalisation des actions sensibles.
Un élève ne doit jamais pouvoir consulter les résultats d'un autre élève simplement en modifiant un ID dans l'URL.
Un enseignant ne doit accéder qu'aux classes qui lui sont affectées.
Un parent ne doit accéder qu'à ses propres enfants.
==================================================
31. JOURNAL D'AUDIT
==================================================
Enregistrer les actions sensibles :
- création ;
- modification ;
- suppression ;
- modification de note ;
- modification de paiement ;
- génération de bulletin ;
- changement de permission ;
- connexion importante.
Enregistrer :
- utilisateur ;
- action ;
- entité ;
- ancien contenu ;
- nouveau contenu ;
- date ;
- heure.
==================================================
32. BASE DE DONNÉES
==================================================
Créer un schéma relationnel propre.
Prévoir notamment les tables :
profiles
roles
permissions
role_permissions
academic_years
terms
sequences
classes
subjects
class_subjects
student_profiles
teacher_profiles
parent_profiles
parent_students
enrollments
teacher_assignments
evaluation_types
evaluations
grades
attendance_sessions
attendance_records
document_categories
documents
assignments
assignment_submissions
rooms
timetables
report_cards
report_card_details
payments
payment_methods
receipts
notifications
announcements
exam_sessions
exam_results
audit_logs
Ajouter les clés étrangères, index et contraintes nécessaires.
Utiliser des UUID pour les identifiants lorsque cela est pertinent.
==================================================
33. ARCHITECTURE DU CODE
==================================================
Organiser le projet proprement.
Séparer :
- pages ;
- composants ;
- services ;
- hooks ;
- types ;
- utilitaires ;
- logique métier ;
- accès aux données.
Ne pas mettre toute la logique dans un seul fichier.
Créer des composants réutilisables.
Exemples :
DataTable
SearchBar
FilterBar
StatCard
Modal
ConfirmDialog
EmptyState
LoadingState
Pagination
FileUploader
GradeTable
StudentCard
ReportCardPreview
NotificationBell
==================================================
34. UX
==================================================
L'application doit être très simple à utiliser pour des personnes qui ne sont pas nécessairement techniciennes.
Toujours afficher :
- confirmation après sauvegarde ;
- erreur compréhensible ;
- chargement ;
- état vide ;
- confirmation avant suppression.
Utiliser des notifications toast.
Éviter les interfaces surchargées.
==================================================
35. RESPONSIVE
==================================================
La plateforme doit être parfaitement utilisable :
- ordinateur ;
- tablette ;
- smartphone.
L'expérience mobile est prioritaire pour les élèves et parents.
Les tableaux doivent être adaptés aux petits écrans.
==================================================
36. DONNÉES DE DÉMONSTRATION
==================================================
Créer des données de démonstration réalistes pour permettre de tester l'application.
Créer notamment :
- une année scolaire 2026/2027 ;
- 3 trimestres ;
- 6 séquences ;
- plusieurs classes ;
- plusieurs matières ;
- enseignants ;
- élèves ;
- parents ;
- évaluations ;
- notes ;
- documents ;
- paiements ;
- notifications.
Créer également des comptes de démonstration correspondant aux différents rôles.
Ne pas utiliser de vraies données personnelles.
==================================================
37. DASHBOARD ADMINISTRATEUR
==================================================
Le dashboard doit être la première interface après connexion d'un administrateur.
Créer une interface moderne comprenant :
- sidebar ;
- header ;
- profil utilisateur ;
- notifications ;
- cartes statistiques ;
- graphiques ;
- activités récentes ;
- alertes ;
- raccourcis rapides.
Exemple :
[ Élèves ] [ Enseignants ] [ Classes ] [ Moyenne générale ]
Puis :
Graphique évolution des résultats
Graphique assiduité
Dernières activités
==================================================
38. PERFORMANCE
==================================================
Éviter les requêtes inutiles.
Utiliser :
- pagination ;
- recherche serveur lorsque nécessaire ;
- index ;
- chargement différé ;
- cache lorsque pertinent.
Ne pas charger tous les élèves ou tous les documents si la base contient des milliers d'enregistrements.
==================================================
39. ARCHITECTURE ÉVOLUTIVE
==================================================
Préparer le projet pour permettre plus tard :
- application Android ;
- application iOS ;
- PWA ;
- API REST ;
- système de paiement en ligne ;
- SMS ;
- WhatsApp ;
- email ;
- intelligence artificielle ;
- multi-groupes ;
- multi-écoles ;
- abonnement SaaS.
Ne pas implémenter ces fonctionnalités maintenant si elles ne sont pas nécessaires au MVP.
Mais ne pas construire l'architecture d'une manière qui empêcherait leur ajout.
==================================================
40. FUTURE FONCTIONNALITÉ IA
==================================================
Prévoir dans l'architecture un emplacement pour un futur module IA pouvant :
- analyser les résultats ;
- détecter les élèves en difficulté ;
- recommander des matières à renforcer ;
- générer des recommandations pédagogiques ;
- analyser la progression ;
- proposer des exercices personnalisés.
Ne pas intégrer l'IA dans le MVP sauf si nécessaire.
==================================================
41. ORDRE DE DÉVELOPPEMENT
==================================================
Ne tente pas de tout générer simultanément.
Développe par étapes :
PHASE 1
- architecture ;
- authentification ;
- rôles ;
- base de données ;
- layout général.
PHASE 2
- années scolaires ;
- trimestres ;
- séquences ;
- classes ;
- matières.
PHASE 3
- élèves ;
- enseignants ;
- parents ;
- inscriptions.
PHASE 4
- évaluations ;
- notes ;
- calculs ;
- moyennes ;
- rangs.
PHASE 5
- bulletins ;
- PDF.
PHASE 6
- documents ;
- devoirs.
PHASE 7
- assiduité.
PHASE 8
- emploi du temps.
PHASE 9
- paiements ;
- reçus.
PHASE 10
- notifications ;
- annonces.
PHASE 11
- statistiques ;
- audit logs.
PHASE 12
- optimisation ;
- sécurité ;
- responsive ;
- tests.
==================================================
42. RÈGLE IMPORTANTE DE DÉVELOPPEMENT
==================================================
À chaque phase :
1. analyser l'architecture existante ;
2. ne pas casser les fonctionnalités précédentes ;
3. créer les tables nécessaires ;
4. créer les composants nécessaires ;
5. connecter réellement les données ;
6. tester ;
7. corriger les erreurs ;
8. seulement ensuite passer à la phase suivante.
Ne jamais remplacer une fonctionnalité fonctionnelle par une fausse interface statique.
==================================================
43. QUALITÉ DU CODE
==================================================
Le code doit être :
- propre ;
- lisible ;
- modulaire ;
- typé ;
- documenté lorsque nécessaire ;
- maintenable ;
- sécurisé.
Éviter :
- duplication de code ;
- composants gigantesques ;
- logique métier dans les composants UI ;
- valeurs hardcodées ;
- données fictives utilisées comme données réelles ;
- fausses API ;
- boutons sans fonctionnalité.
==================================================
44. LIVRABLE FINAL
==================================================
Je veux obtenir une application web professionnelle nommée :
"TSS Platform"
avec :
- authentification ;
- dashboard par rôle ;
- base de données réelle ;
- gestion académique ;
- gestion des élèves ;
- gestion enseignants ;
- gestion parents ;
- gestion des notes ;
- calcul des moyennes ;
- bulletins ;
- PDF ;
- documents ;
- devoirs ;
- assiduité ;
- emploi du temps ;
- paiements ;
- notifications ;
- statistiques ;
- audit.
L'interface doit être moderne, professionnelle et responsive.
==================================================
45. CONSIGNE FINALE
==================================================
Commence par analyser l'ensemble de ces spécifications.
NE génère PAS immédiatement toutes les fonctionnalités.
Commence par :
1. définir l'architecture du projet ;
2. définir le schéma de base de données ;
3. définir les relations ;
4. définir les rôles et permissions ;
5. créer le système d'authentification ;
6. créer le layout principal ;
7. créer le dashboard de base.
Après chaque étape, vérifie que le projet fonctionne avant de continuer.
L'objectif est de construire une véritable plateforme de gestion de groupe de répétition camerounais, pas une simple maquette.
Priorité absolue :
1. Fonctionnalité
2. Sécurité
3. Intégrité des données
4. Expérience utilisateur
5. Maintenabilité
6. Performance
7. Évolutivité
Commence maintenant par la PHASE 1.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ed973c67-ad9b-4cd4-8bac-9230682af1b4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
