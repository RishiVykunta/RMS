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
2.  **Environment Variables**: Add the following in the Vercel project settings:
    - `DATABASE_URL`: Your Neon connection string.
    - `JWT_SECRET`: A strong random string for session encryption.
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
