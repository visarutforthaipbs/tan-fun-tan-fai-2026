# Deployment Guide for Vercel

This guide explains how to deploy the "Tan Fun Tan Fai" project to Vercel.

## 1. Prerequisites

- A Vercel account (https://vercel.com)
- The project pushed to a GitHub repository

## 2. Configuration Added

I have added a `vercel.json` file to the project root with the following configuration:

```json
{
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures that:
1. Vercel recognizes the project as a Vite application.
2. All routes (like `/tracker`, `/action`) are correctly handled by the React application (Single Page Application routing), preventing 404 errors on refresh.

## 3. Deployment Steps

1.  **Log in to Vercel** and click **"Add New..."** -> **"Project"**.
2.  **Import Git Repository**: Select your GitHub repository for this project.
3.  **Configure Project**:
    - **Framework Preset**: Vercel should automatically detect **Vite**. If not, select "Vite".
    - **Root Directory**: `./` (default)
    - **Build Command**: `npm run build` (default)
    - **Output Directory**: `dist` (default)
    - **Install Command**: `npm install` (default)

4.  **Environment Variables**:
    - The project configuration (`vite.config.ts`) references a `GEMINI_API_KEY`.
    - **If you are using Gemini features**, add `GEMINI_API_KEY` in the Environment Variables section.
    - **If not**, you can skip this, as the current code does not appear to actively use it.

5.  **Deploy**: Click **"Deploy"**.

## 4. Post-Deployment

- Vercel will build your project and provide a URL (e.g., `https://tan-fun-tan-fai.vercel.app`).
- Check that navigation between pages works correctly.
- If you see any styling issues, ensure the Tailwind CSS script is loading correctly (it is currently using a CDN).

## 5. Optimization Note (Optional)

Currently, the project uses Tailwind CSS via a CDN script in `index.html`. This performs a runtime compilation of CSS.
- **Pros**: Easy to use, no build setup required.
- **Cons**: Slower initial load, potential "flash of unstyled content".

For a production-grade deployment in the future, consider installing Tailwind CSS locally (`npm install -D tailwindcss postcss autoprefixer`) and running `npx tailwindcss init -p` to generate static CSS at build time.
