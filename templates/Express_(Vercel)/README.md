# Create Jaydee App

This is a Jaydee App. This is a quick way to start up an application with TypeScript. Currently, the only option is for an Express server.

This is a way to start up an appliation using the tools I like to use, including:

- [Zod](https://zod.dev/)
- [Drizzle](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/) using [Supabase](https://supabase.com/)
- [ESLint](https://eslint.org/)

## Steps After Creating App

- Change the database table prefix accordingly to the project. Go into both src/db/index.ts and drizzle.config.ts and change the table prefix.

- Create a .env file and set environment variables for the server PORT number and the DATABASE_URL. Use the .env.example file for help.

- When adding new environment variables, add their schema validation to the env.js file to ensure typesafe environment variabes throughout the project.

- Modify the database schema in src/db/schema.ts and run "npm run db:push" to push your schema to the database.

- Pass the validate middleware from src/middleware/zod.middleware.ts into every route to ensure typesafe requests.
