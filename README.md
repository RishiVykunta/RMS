# 🚆 Railway Management System (RMS)

[![Live Demo](https://img.shields.io/badge/Live_Demo-rms--sable.vercel.app-success?style=for-the-badge&logo=vercel)](https://rms-sable.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-6.19.2-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql)

A modern, full-stack Railway Reservation System built with **Next.js 16 (App Router)**, **React 19**, and **TypeScript**. This platform offers a seamless experience for passengers to search trains, book tickets, check PNR status, and view seat availability, while providing a robust admin dashboard for managing trains, routes, and bookings.

---

## ✨ Key Features

- **🔐 Secure Authentication**: Integrated with Google OAuth and JWT-based custom authentication (bcryptjs) with email verification.
- **👥 Role-Based Access Control**: Differentiated experiences for `PASSENGER` and `ADMIN` users.
- **🎟️ Comprehensive Booking Engine**: 
  - Dynamic seat availability calculation.
  - Automatic PNR generation and status tracking.
  - Waiting list logic support.
- **🚅 Train & Route Management**: Define trains, multiple stopping routes, distance, duration, and platforms.
- **💺 Multi-Class Support**: SLEEPER, AC_3_ECONOMY, AC_3_TIER, AC_2_TIER, AC_FIRST_CLASS.
- **📧 Automated Emails**: Integrated with [Resend](https://resend.com) for sending verification and booking confirmation emails.
- **💻 Modern UI/UX**: Fully responsive and accessible, built with Tailwind CSS v4.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS v4, Zod (Validation)
- **Backend**: Next.js Server Actions & API Routes, Node.js
- **Database**: PostgreSQL (hosted on [Neon](https://neon.tech/))
- **ORM**: Prisma Client v6
- **Auth**: `@react-oauth/google`, `jose`, `bcryptjs`
- **Mail**: Resend

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js**: v18 or explicitly higher recommended.
- **PostgreSQL**: A running instance or a [Neon](https://neon.tech) database.

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/RishiVykunta/RMS.git
cd RMS
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory and configure the following:

```env
DATABASE_URL="postgresql://user:password@hostname/dbname?sslmode=require"
JWT_SECRET="your_highly_secure_random_string"
RESEND_API_KEY="re_your_api_key_from_resend"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your_google_oauth_client_id"
```

### 3. Database Setup

Synchronize the database schema and seed the initial data (Stations, Trains, Admin User):

```bash
npm run db:setup
# This executes: npx prisma db push && npx prisma db seed
```

*Note: Default admin credentials seeded are:*
- **Email:** `admin@railway.com`
- **Password:** `admin123`

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

```text
RMS/
├── app/               # Next.js App Router pages and API endpoints
├── actions/           # Next.js Server Actions (e.g., bookingActions.ts)
├── components/        # Reusable React UI Components
├── lib/               # Utility functions, Prisma client, and Auth helpers
├── prisma/            # Prisma schema models and seed scripts
├── public/            # Static assets
└── .env               # Environment configuration
```

---

## 🌐 Deployment

This application is optimized for deployment on [Vercel](https://vercel.com/).

1. Connect your GitHub repository to Vercel.
2. Add the required Environment Variables in the Vercel dashboard.
3. The build command `prisma generate && next build` is already configured in `package.json`.
4. Deploy!

For a detailed deployment guide, please refer to [`DEPLOYMENT.md`](./DEPLOYMENT.md).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.
