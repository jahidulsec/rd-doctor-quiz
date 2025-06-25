import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "./session";
import { AuthUser } from "@/types/auth-user";

export const verifyAutuser: () => Promise<
  AuthUser | undefined | null
> = async () => {
  try {
    const cookie = await cookies();
    const value = cookie.get("session")?.value;
    const session = await decrypt(value);

    const user = session;

    return user as any;
  } catch (error) {
    console.log("Failed to fetch user");
    console.error(error);
    return null;
  }
};
