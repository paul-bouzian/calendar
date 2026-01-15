# SayCal

**Parle, c'est noté.**

Calendrier minimaliste avec création d'événements par la voix. Dites simplement "Dentiste demain à 14h" et l'événement est créé automatiquement.

## Fonctionnalités

- **Création vocale ultra-rapide** - Dictez vos événements en langage naturel
- **Interface épurée** - Design moderne sans surcharge, vue jour/semaine/mois
- **Multi-plateforme** - PWA responsive, parfaite sur mobile et desktop
- **Open Source** - Code transparent, données sécurisées

## Stack Technique

| Catégorie | Technologie |
|-----------|-------------|
| Framework | TanStack Start (React 19) |
| Déploiement | Cloudflare Workers |
| Base de données | Neon PostgreSQL + Drizzle ORM |
| Auth | Neon Auth |
| IA | Deepgram (STT) + Gemini Flash (parsing) |
| UI | shadcn/ui + Tailwind CSS |
| i18n | Paraglide |

## Installation

```bash
# Cloner le repo
git clone https://github.com/paul-bouzian/saycal.git
cd saycal

# Installer les dépendances
bun install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés

# Lancer le serveur de développement
bun run dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000).

## Commandes

```bash
bun run dev          # Serveur dev (port 3000)
bun run build        # Build production
bun run check        # Lint + format (Biome)
bun run test         # Tests Vitest
bun run deploy       # Déployer sur Cloudflare
bun run db:push      # Push schema vers Neon
bun run db:generate  # Générer migration
bun run db:studio    # Interface Drizzle Studio
```

## Architecture

```
src/
├── routes/          # Routing fichier-based (TanStack Router)
├── features/        # Composants par feature
├── components/ui/   # Composants shadcn/ui
├── db/              # Schema Drizzle ORM
├── paraglide/       # Runtime i18n (auto-généré)
└── lib/             # Utilitaires
messages/            # Traductions (en, fr, de)
specs/               # Documentation technique
```

## Design System

| Couleur | Hex | Usage |
|---------|-----|-------|
| Primaire | `#B552D9` | Actions principales, boutons |
| Secondaire | `#FA8485` | Accents, highlights |
| Gradient | `135deg` | CTAs, bouton micro |

## Variables d'environnement

```env
VITE_DATABASE_URL=          # URL Neon directe
VITE_DATABASE_URL_POOLER=   # URL Neon pooler
DEEPGRAM_API_KEY=           # Clé API Deepgram
GEMINI_API_KEY=             # Clé API Gemini
STRIPE_SECRET_KEY=          # Clé secrète Stripe
```

## Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/ma-feature`)
3. Commit les changements (`git commit -m 'feat: ajouter ma feature'`)
4. Push (`git push origin feature/ma-feature`)
5. Ouvrir une Pull Request

## License

MIT
