export const dependencyVersionMap = {
  // Drizzle
  "drizzle-kit": "^0.30.4",
  "drizzle-orm": "^0.39.1",
  "eslint-plugin-drizzle": "^0.2.3",
  "@libsql/client": "^0.14.0",

  // tRPC
  "@trpc/client": "^11.0.0-rc.446",
  "@trpc/server": "^11.0.0-rc.446",
  "@trpc/react-query": "^11.0.0-rc.446",
  "@trpc/next": "^11.0.0-rc.446",
  "@tanstack/react-query": "^5.50.0",
  superjson: "^2.2.1",
  "server-only": "^0.0.1",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
