import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "./session";
import { JWTPayload } from "jose";

export const verifyAutuser: () => Promise<
  JWTPayload | undefined | null
> = async () => {
  try {
    const cookie = await cookies();
    const value = cookie.get("session")?.value;
    const session = await decrypt(value);

    const user = session;

    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    console.error(error);
    return null;
  }
};
