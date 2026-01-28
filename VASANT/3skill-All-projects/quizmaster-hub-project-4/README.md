# QuizMaster Hub

An interactive quiz application built with Vite, React, TypeScript, Tailwind CSS, and shadcn/ui, backed by Supabase. Create questions, manage your personal question bank, and take quizzes with results and history tracking.

## Features

- Auth with Supabase Auth
- Add Question with validation using `zod`
- Manage Questions with delete, category and difficulty badges
- Take Quiz
  - Random quiz or only “My Questions” via `?createdBy=me`
  - Single-question practice via `?questionId=<id>`
  - Timer, progress, navigation grid, and result summary
- Results & History pages
- Answer visibility lock in My Questions (password `Vasantjv05$`)
- Modern UI powered by shadcn/ui + Tailwind

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- React Router v6
- TanStack Query (React Query)
- Supabase (DB + Auth)
- Zod for validation
- Lucide for icons

## Project Structure

- `src/pages/`
  - `Index.tsx`, `Auth.tsx`, `Quiz.tsx`, `Results.tsx`, `History.tsx`
  - `AddQuestion.tsx`, `ManageQuestions.tsx`
- `src/components/quiz/`
  - `Timer`, `ProgressBar`, `QuestionCard`, `QuestionNavigation`
- `src/integrations/supabase/`
  - `client.ts` (uses `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`)
- `public/`
  - `mind.png` (favicon), optional `favicon.ico`

## Getting Started

- Prerequisites
  - Node.js 18+ and npm

- Install
  - `npm install`

- Environment
  - Create `.env` (or `.env.local`) with:
    - `VITE_SUPABASE_URL=<your_supabase_url>`
    - `VITE_SUPABASE_PUBLISHABLE_KEY=<your_supabase_anon_key>`

- Run (dev)
  - `npm run dev`

- Build
  - `npm run build`

- Preview
  - `npm run preview`

## Available Scripts

- `npm run dev` – start dev server
- `npm run build` – build for production
- `npm run preview` – preview production build
- `npm run lint` – lint code

## Routes

- `/` Home
- `/auth` Sign in / Sign up
- `/add-question` Create a question
- `/manage-questions` View, quiz, and delete your questions
- `/quiz` Start a quiz
  - `/quiz?createdBy=me` Quiz using your own questions
  - `/quiz?questionId=<id>` Quiz for a specific question
- `/results` Quiz results
- `/history` Past results

## Supabase Schema (overview)

- `questions`
  - `id` (uuid), `question_text`, `option_a`..`option_d`, `correct_option` ('A'|'B'|'C'|'D')
  - `category` (string), `difficulty` ('easy'|'medium'|'hard')
  - `created_by` (user id), `created_at` (timestamp)
- `quiz_results`
  - `user_id`, `total_questions`, `attempted`, `correct`, `wrong`, `score`, `passed`, `time_taken`
  - `answers` (JSON array with details per question)

Adjust field names/types to match your Supabase migration if different.

## UI Details

- Title set in `index.html` to `Quiz Master App`
- Favicon set to `/mind.png` (place `mind.png` in `public/`)
- Browsers cache favicons: hard refresh or add `?v=1` to break cache

## Conventions

- TypeScript strictness recommended
- Keep UI logic in components, data-access via Supabase client
- Use `zod` schemas to validate form data
- Keep auth guards in pages that require login (redirect to `/auth`)

## License

- MIT (or specify your license)
