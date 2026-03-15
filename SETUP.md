# Railway Reservation System (RMS) - Local Setup Guide

Follow these steps to set up and run the project locally.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (v18+ recommended).
- **Environment Variables**: Ensure you have a `.env` file in the root directory with `DATABASE_URL` (Neon PostgreSQL) and `JWT_SECRET`.

## First-Time Setup

Run the following command to install dependencies and set up the database (sync schema and seed initial data):

```bash
# Install dependencies
npm install

# Sync database schema and seed data
npm run db:setup
```

## Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Default Access (Seed Data)

The database is seeded with a default admin user:
- **Email**: `admin@railway.com`
- **Password**: `admin123`

## Useful Commands

- `npm run dev`: Starts the Next.js development server.
- `npx prisma studio`: Opens a GUI to view and edit your database records.
- `npx prisma db push`: Syncs your `schema.prisma` with the database.
- `npx prisma db seed`: Runs the seed script in `prisma/seed.ts`.
