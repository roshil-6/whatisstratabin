# Stratabin Landing Page

Interactive 3D landing page for **Stratabin** — a structured workspace designed to turn scattered ideas into clear plans and actionable execution.

## Tech Stack

- **Next.js 14** (App Router)
- **React Three Fiber** + **Drei** for 3D elements
- **Tailwind CSS** for styling
- **TypeScript**

## Color Theme

White, Orange (#f97316), Black

## Sections

1. **What is Stratabin?** — Hero with 3D scene, Vision, Features (Individual & Team), How it Works, Future Implementation, Summary
2. **About Us** — Founder profile (Abhinand Antony / Roschil) with 3D visual

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy on Vercel

1. Push to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Deploy — Vercel auto-detects Next.js

Or use Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Enhancing 3D Elements

The founder section uses an abstract geometric 3D scene. To enhance with **Pencil AI** or custom 3D models:

- Replace `FounderScene.tsx` with a GLTF/GLB model using `useGLTF` from `@react-three/drei`
- Add your Pencil AI–generated 3D asset to `/public` and load it in the scene
