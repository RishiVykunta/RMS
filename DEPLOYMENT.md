# Deployment Guide - RMS

This guide covers the steps required to deploy the Railway Reservation System (RMS) to **Neon (Database)** and **Vercel (Frontend)**.

## 1. Neon Database Setup

1.  **Create a Project**: Log in to [Neon](https://neon.tech/) and create a new project.
2.  **Get Connection String**: 
    - Go to the **Dashboard**.
    - Copy the **Connection Details**.
    - You will need both the **Pooled** connection string (for the app) and the **Direct** connection string (for migrations/seeding).
3.  **Local Environment**: Add the following to your local `.env` if you want to test against the production DB:
    ```bash
    DATABASE_URL="postgresql://user:password@hostname/dbname?sslmode=require"
    ```

## 2. Vercel Deployment

1.  **Import Project**: Push your code to GitHub and import it into Vercel.
### 3. Environment Variables

Add these to your **Vercel Project Settings > Environment Variables**:

| Variable | Value / How to Find |
| :--- | :--- |
| `DATABASE_URL` | From Neon Console (Connection String) |
| `JWT_SECRET` | Any long random string (e.g., `openssl rand -base64 32`) |
| `RESEND_API_KEY` | Create at [resend.com/api-keys](https://resend.com/api-keys) |
| `NEXT_PUBLIC_APP_URL` | Your Vercel URL (e.g., `https://rms-sable.vercel.app`) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | From [Google Cloud Console](https://console.cloud.google.com/) |

---

## How to find/get these keys:

### 1. Resend API Key (for Emails)
1. Go to [Resend.com](https://resend.com) and create an account.
2. Click on **API Keys** in the sidebar.
3. Click **Create API Key**.
4. Name it "RMS" and give it "Full Access".
5. Copy the key (starts with `re_`).

### 2. Google Client ID (for Google Sign-In)
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project named "RMS".
3. Go to **APIs & Services > OAuth consent screen**.
4. Choose "External" and fill in the required app information (app name, email).
5. Go to **Credentials > Create Credentials > OAuth client ID**.
6. Select **Web application**.
7. Under **Authorized JavaScript origins**, add:
   - `http://localhost:3000`
   - `https://your-app.vercel.app` (Replace with your actual Vercel URL)
8. Under **Authorized redirect URIs**, add the same URLs.
9. Click **Create** and copy the **Client ID**.

---

## Final Steps
3.  **Build Settings**: The project is already configured to run `prisma generate && next build`.

## 3. Initial Database Setup & Seeding

After the first deployment succeeds, you need to push the schema and seed the initial data (stations, trains, admin user).

1.  **Run Setup Script Locally**: Ensure your `.env` has the **Direct** Neon connection string and run:
    ```bash
    npm run db:setup
    ```
    *Note: `db:setup` runs `prisma db push` and `prisma db seed`.*

## 4. Verification

1.  Visit your Vercel deployment URL.
2.  Verify you can:
    - Log in as admin (`admin@railway.com` / `admin123`).
    - Search for trains (e.g., New Delhi to Mumbai Central).
    - Register a new passenger account and book a ticket.
