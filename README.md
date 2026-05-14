# 🎬 ReelGen AI — Full Deployment Guide

> AI-powered 30-second video reel generator with Login + Dashboard

---

## 📁 Project Structure

```
reelgen-ai/
├── public/
│   └── index.html              ← HTML entry point
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx         ← Navigation sidebar
│   │   ├── ReelCard.jsx        ← Individual reel card
│   │   └── Toast.jsx           ← Notification toast
│   ├── data/
│   │   └── constants.js        ← Mock data, options, config
│   ├── pages/
│   │   ├── Login.jsx           ← Login page
│   │   ├── Home.jsx            ← Dashboard home
│   │   ├── CreateReel.jsx      ← AI reel generator
│   │   └── OtherPages.jsx      ← Library, Analytics, Settings
│   ├── styles/
│   │   └── global.css          ← CSS variables & animations
│   ├── App.js                  ← Root component + routing
│   └── index.js                ← React entry point
├── .gitignore
├── vercel.json                 ← Vercel deployment config
├── package.json
└── README.md
```

---

## 🔐 Demo Login

| Field    | Value              |
|----------|--------------------|
| Email    | demo@reelgen.ai    |
| Password | demo123            |

---

## 🖥️ STEP 1 — Run in VS Code (Line by Line)

### 1.1 Install Prerequisites

Open your terminal (PowerShell on Windows, Terminal on Mac/Linux):

```bash
# Check if Node.js is installed (need v16 or higher)
node --version

# If not installed, download from: https://nodejs.org
# Choose the LTS version
```

### 1.2 Open Project in VS Code

```bash
# Navigate to where you saved the reelgen-ai folder
cd path/to/reelgen-ai

# Open in VS Code
code .
```

Or: Open VS Code → File → Open Folder → select `reelgen-ai`

### 1.3 Open VS Code Terminal

```
Menu: Terminal → New Terminal
Shortcut: Ctrl + ` (backtick)
```

### 1.4 Install Dependencies

```bash
# This reads package.json and downloads all libraries into node_modules/
npm install
```

Expected output: `added 1xxx packages in Xs`

### 1.5 Start Development Server

```bash
# Starts the app on http://localhost:3000
npm start
```

Expected: Browser opens automatically at `http://localhost:3000`
- Login with `demo@reelgen.ai` / `demo123`
- Hot reload: save any file → browser updates instantly

### 1.6 Build for Production

```bash
# Creates optimized production files in /build folder
npm run build
```

Expected output: `Build successful! Files in build/`

---

## 🐙 STEP 2 — Push to GitHub

### 2.1 Create a GitHub Account

Go to https://github.com → Sign up (free)

### 2.2 Install Git

```bash
# Check if git is installed
git --version

# If not: download from https://git-scm.com
# Mac: brew install git
# Ubuntu: sudo apt install git
```

### 2.3 Configure Git (First Time Only)

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### 2.4 Initialize Git in Your Project

```bash
# Make sure you're in the reelgen-ai folder
cd path/to/reelgen-ai

# Initialize git repository
git init

# Add all files to staging
git add .

# Create first commit
git commit -m "Initial commit - ReelGen AI app"
```

### 2.5 Create a New Repository on GitHub

1. Go to https://github.com
2. Click the **+** button (top right) → **New repository**
3. Repository name: `reelgen-ai`
4. Set to **Public** (required for free Vercel deploy)
5. DO NOT check "Add README" (you already have one)
6. Click **Create repository**

### 2.6 Connect Local to GitHub and Push

Copy the commands GitHub shows you, OR run these:

```bash
# Add GitHub as the remote origin (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/reelgen-ai.git

# Rename branch to main (modern standard)
git branch -M main

# Push code to GitHub
git push -u origin main
```

You'll be asked for your GitHub username and password.
> ⚠️ GitHub no longer accepts passwords for push — use a Personal Access Token:
> GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic) → Generate new token → check "repo" scope → use that token as your password

### 2.7 Verify

Go to `https://github.com/YOUR_USERNAME/reelgen-ai` — you should see all your files.

---

## 🚀 STEP 3 — Deploy on Vercel (Free)

### 3.1 Create a Vercel Account

1. Go to https://vercel.com
2. Click **Sign Up**
3. Choose **Continue with GitHub** ← easiest option
4. Authorize Vercel to access your GitHub

### 3.2 Import Your Project

1. On Vercel dashboard → click **Add New Project**
2. You'll see a list of your GitHub repos
3. Find `reelgen-ai` → click **Import**

### 3.3 Configure Build Settings

Vercel auto-detects React. Verify these settings:

| Setting          | Value           |
|------------------|-----------------|
| Framework Preset | Create React App |
| Root Directory   | `./`            |
| Build Command    | `npm run build` |
| Output Directory | `build`         |

Leave everything else as default.

### 3.4 Deploy!

Click **Deploy** button.

Vercel will:
1. Clone your repo
2. Run `npm install`
3. Run `npm run build`
4. Deploy to a CDN globally

Takes about 60–90 seconds.

### 3.5 Your Live URL

After deploy you get a URL like:
```
https://reelgen-ai.vercel.app
```

Share this link — it works from anywhere in the world! 🌍

---

## 🔄 How to Update Your App

After making changes:

```bash
# Stage your changes
git add .

# Commit with a description
git commit -m "Updated dashboard layout"

# Push to GitHub
git push
```

Vercel automatically detects the push and **redeploys in ~60 seconds**. Zero manual steps!

---

## 🌐 Custom Domain (Optional)

1. Vercel Dashboard → your project → **Settings** → **Domains**
2. Add your domain: `yoursite.com`
3. Follow DNS instructions (add CNAME record in your domain registrar)
4. SSL certificate is automatic and free

---

## 🔧 Connect Real APIs (Make It Production-Ready)

To turn this into a real full-stack app:

### Authentication
```bash
npm install firebase
# or
npm install @supabase/supabase-js
```
Replace `MOCK_USERS` in `src/data/constants.js` with real auth.

### AI Video Generation
- **Runway ML**: https://runwayml.com/api
- **Pika Labs**: https://pika.art/api
- **Stable Video Diffusion**: via Replicate API

### AI Voiceover
- **ElevenLabs**: https://elevenlabs.io/api
- **OpenAI TTS**: `openai` npm package

### Database
- **Supabase** (PostgreSQL + auth, free tier): https://supabase.com
- **Firebase Firestore** (NoSQL, free tier): https://firebase.google.com

### Environment Variables

Create a `.env` file in root (never commit this):
```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_KEY=your_key
REACT_APP_ELEVENLABS_KEY=your_key
REACT_APP_RUNWAY_KEY=your_key
```

Add these same variables in Vercel:
**Vercel Dashboard → Project → Settings → Environment Variables**

---

## 🛠️ Common Issues & Fixes

| Problem | Fix |
|---------|-----|
| `npm install` fails | Delete `node_modules/` and `package-lock.json`, run again |
| Port 3000 already in use | Run `npm start` — it'll offer port 3001 |
| Git push rejected | Make sure you set up the Personal Access Token |
| Vercel build fails | Check the build log — usually a missing import or syntax error |
| White screen on Vercel | Check browser console for errors |
| Fonts not loading | Ensure `public/index.html` has the Google Fonts link |

---

## 📋 Quick Reference Commands

```bash
npm install          # Install all dependencies
npm start            # Start dev server (localhost:3000)
npm run build        # Build for production
git add .            # Stage all changes
git commit -m "msg"  # Commit with message
git push             # Push to GitHub (triggers Vercel redeploy)
```

---

Made with ❤️ using React + Vercel