import { createAuthClient } from "better-auth/react";
import getBaseUrl from "~/lib/get-base-url";
export const { signIn, signOut, signUp, useSession } = createAuthClient({
  baseURL: getBaseUrl(),
});
