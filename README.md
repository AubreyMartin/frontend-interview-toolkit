# Frontend Interview Toolkit

Practice frontend interview questions by **topic** (JavaScript, React, HTML, CSS) and **difficulty** (Rookie, Mid, Pro).

## Features

- **Browse questions** by topic and difficulty
- **Reveal answers** with a single click
- **Practice coding** in-browser with Monaco Editor
- **Track progress** (viewed, revealed, completed) in localStorage
- **Simulate interviews** with random question sets

## Tech stack

- **Frontend:** Next.js 14 (App Router), React, Tailwind CSS
- **Code editor:** Monaco Editor (`@monaco-editor/react`)
- **Deployment:** Vercel-ready

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
/app          # Routes: /, /topics, /question/[id], /interview, /progress
/components   # Navbar, QuestionCard, AnswerToggle, CodeEditor, ProgressBar, DifficultyBadge
/data         # questions.ts (topics, levels, question bank)
/lib          # utils (progress helpers, cn, colors)
/styles       # globals.css
```

## Later phase

- **Backend / Auth:** Supabase for user accounts and synced progress
