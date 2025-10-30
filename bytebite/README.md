# ByteBite – Minimal Restaurant Management System

ByteBite is a lightweight, full-stack web application designed to help small restaurants manage their daily operations with ease. This system provides a clean, mobile-friendly user interface for managing menus, orders, and tables.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [Neon](https://neon.tech/) (Serverless PostgreSQL)
- **Authentication:** [Auth.js (NextAuth.js)](https://authjs.dev/)

## Features

- **Menu Management:** Add, edit, delete, and categorize dishes. Toggle dish availability on the fly.
- **Order Dashboard:** Create new orders, view active and completed orders, and calculate the total bill.
- **Table Tracker:** View table statuses (e.g., Available, Occupied) and assign orders to tables.
- **Secure Authentication:** Email-based authentication to protect your data.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/bytebite.git
    cd bytebite
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up the database:**
    - Sign up for a free account on [Neon](https://neon.tech/).
    - Create a new project and get your PostgreSQL connection string.

4.  **Configure environment variables:**
    - Create a `.env` file in the root of the project.
    - Add the following environment variables:
      ```
      DATABASE_URL="your-neon-database-connection-string"
      NEXTAUTH_SECRET="generate-a-random-string" # openssl rand -hex 32
      EMAIL_SERVER_HOST="your-email-server-host"
      EMAIL_SERVER_PORT="your-email-server-port"
      EMAIL_SERVER_USER="your-email-server-user"
      EMAIL_SERVER_PASSWORD="your-email-server-password"
      EMAIL_FROM="your-email-from-address"
      ```

5.  **Run database migrations:**
    ```bash
    npx prisma migrate dev
    ```

6.  **Seed the database with sample data:**
    ```bash
    npx prisma db seed
    ```

7.  **Run the development server:**
    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:3000`.

## Deployment on Vercel

1.  **Push your project to a Git repository** (e.g., GitHub, GitLab, Bitbucket).

2.  **Sign up for a free account on [Vercel](https://vercel.com/).**

3.  **Create a new project and connect your Git repository.**

4.  **Configure the environment variables** in the Vercel project settings. Use the same variables from your `.env` file.

5.  **Deploy!** Vercel will automatically build and deploy your application. Any new pushes to your Git repository will trigger a new deployment.

---

This README provides a clear and concise guide for setting up and deploying the ByteBite application.