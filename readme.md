# mtgtracker

mtgtracker is a web application designed to help Magic: The Gathering players track their matches, analyze their performance, and improve their game.

## 🧙‍♂️ What is mtgtracker?

mtgtracker allows you to:

- Record Magic: The Gathering match results and game outcomes
- Analyze performance metrics over time
- Add notes to remember key moments or strategies

Perfect for the data-minded planeswalker looking to level up their game!

## ✨ Features

- **Match Tracking**: Log your matches with format, result, and opponent details
- **Game History**: Keep a record of all your MTG games
- **Analytics Dashboard**: Visual charts showing your performance metrics
- **Secure Authentication**: Login with your Google account

## 🛠️ Tech Stack

- **Frontend**: Next.js 15+, React 18+, TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI, Recharts for data visualization
- **Backend**: Next.js API routes and Server Actions
- **Authentication**: Auth.js/NextAuth v5 with Google OAuth
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Deployment**: Vercel-ready setup

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Neon PostgreSQL database
- Google OAuth credentials

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
DATABASE_URL=your_neon_postgresql_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
AUTH_SECRET=random_secure_string_for_session_encryption
```

Each variable is used for:

- `DATABASE_URL`: Connection string to your Neon PostgreSQL database
- `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID (from Google Cloud Console)
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret
- `AUTH_SECRET`: A random string used for encrypting auth sessions

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/mtgtracker.git
   cd mtgtracker
   ```
2. Install dependencies

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```
3. Run the development server

   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```
4. Open http://localhost:3000 to see the app in action

## 📊 Database Setup

1. Create a Neon PostgreSQL database at [neon.tech](https://neon.tech)
2. Copy your connection string to the DATABASE_URL environment variable
3. Push the schema to your database:
   ```bash
   npm run db:push
   # or
   pnpm db:push
   # or
   yarn db:push
   ```

## 🌱 Seeding Sample Data

To generate sample match data for testing:

1. First, create an account in the app (Google sign-in)
2. Find your user ID from the database:

   - Run `npm run db:studio` to open Drizzle Studio
   - Navigate to the "users" table
   - Copy your user ID (should be a UUID)
3. Run the seeder with your user ID:

   ```bash
   npm run db:seed-matches your-user-id-here 15
   # or
   pnpm db:seed-matches your-user-id-here 15
   # or
   yarn db:seed-matches your-user-id-here 15
   ```

   The number 15 represents how many sample matches to create (optional, defaults to 50)

## 🤝 Contributing

Contributions are welcome! Here's how you can help improve mtgtracker:

1. Fork the repository
2. Create a new branch (git checkout -b feature/amazing-feature)
3. Make your changes
4. Run tests to ensure everything works
5. Commit your changes (git commit -m 'Add some amazing feature')
6. Push to the branch (git push origin feature/amazing-feature)
7. Open a Pull Request

Please ensure your code follows the project's style guidelines and includes appropriate tests.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🫂 Special Thanks

☀️ To [Wilson Cazarré](https://github.com/WilsonCazarre), for the auth system implementation.
💧 To [Renato de Souza](https://www.instagram.com/dropdois.mtg), for his consulting on UI and project design.

---

Built with ❤️ for the Magic: The Gathering community
