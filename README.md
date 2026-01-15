<div align="center">

# SayCal

### 🗣️ Speak it. It's noted.

A minimalist calendar with voice-powered event creation.
Just say *"Dentist tomorrow at 2pm"* and the event is created automatically.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Neon](https://img.shields.io/badge/Neon-PostgreSQL-00E5CC?style=flat-square&logo=postgresql&logoColor=white)](https://neon.tech/)
[![TanStack Query](https://img.shields.io/badge/TanStack-Query-FF4154?style=flat-square&logo=react-query)](https://tanstack.com/query)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎤 **Voice Creation** | Dictate events in natural language — done in under 5 seconds |
| 🗓️ **Clean Interface** | Modern design with day/week/month views, no clutter |
| 🔐 **Secure Auth** | Neon Auth (BetterAuth) with social logins |
| 🌍 **Internationalized** | Available in English and French |
| 📱 **Responsive** | Perfect experience on mobile and desktop |
| 🔓 **Open Source** | Transparent code, your data stays yours |

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="96">
<img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/NextJS-Dark.svg" width="48" height="48" alt="Next.js" />
<br><sub><b>Next.js 16</b></sub>
</td>
<td align="center" width="96">
<img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/TypeScript.svg" width="48" height="48" alt="TypeScript" />
<br><sub><b>TypeScript</b></sub>
</td>
<td align="center" width="96">
<img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/TailwindCSS-Dark.svg" width="48" height="48" alt="Tailwind" />
<br><sub><b>Tailwind CSS</b></sub>
</td>
<td align="center" width="96">
<img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/PostgreSQL-Dark.svg" width="48" height="48" alt="PostgreSQL" />
<br><sub><b>Neon DB</b></sub>
</td>
<td align="center" width="96">
<img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Bun-Dark.svg" width="48" height="48" alt="Bun" />
<br><sub><b>Bun</b></sub>
</td>
</tr>
</table>

**Full stack:** Drizzle ORM • TanStack Query • shadcn/ui • Framer Motion • next-intl • Zod • Neon Auth

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/paul-bouzian/saycal.git
cd saycal

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server on port 3000 |
| `bun run build` | Build for production |
| `bun run start` | Run production build |
| `bun run check` | Run Biome linter & formatter |
| `bun run db:generate` | Generate Drizzle migration |
| `bun run db:migrate` | Apply migrations to database |
| `bun run db:studio` | Open Drizzle Studio |

---

## 📁 Project Structure

```
src/
├── app/                    # App Router (pages)
│   └── [locale]/           # Internationalized routes
├── components/
│   ├── calendar/           # Calendar components
│   └── ui/                 # shadcn/ui components
├── db/                     # Drizzle ORM schema & connection
├── features/               # Feature modules (landing, dashboard)
├── i18n/                   # next-intl configuration
├── lib/                    # Utilities & server actions
└── messages/               # Translations (fr.json, en.json)
```

---

## 🎨 Design System

<table>
<tr>
<td align="center">
<img src="https://via.placeholder.com/80/B552D9/FFFFFF?text=+" alt="Primary" />
<br><code>#B552D9</code>
<br><sub>Primary</sub>
</td>
<td align="center">
<img src="https://via.placeholder.com/80/FA8485/FFFFFF?text=+" alt="Secondary" />
<br><code>#FA8485</code>
<br><sub>Secondary</sub>
</td>
<td align="center">
<img src="https://via.placeholder.com/160x80/B552D9/FA8485?text=Gradient" alt="Gradient" />
<br><code>135deg</code>
<br><sub>Brand Gradient</sub>
</td>
</tr>
</table>

---

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database (Neon)
DATABASE_URL=postgresql://...

# Auth (Neon Auth)
NEXT_PUBLIC_NEON_AUTH_URL=https://your-project.auth.neon.tech
NEON_AUTH_BASE_URL=https://your-project.auth.neon.tech

# AI Services (for voice features)
DEEPGRAM_API_KEY=your_deepgram_key
GEMINI_API_KEY=your_gemini_key
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by [Paul Bouzian](https://github.com/paul-bouzian)

</div>
