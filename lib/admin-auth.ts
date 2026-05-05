import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const ADMIN_COOKIE = "leandson-taina-admin";

function getSecret() {
  return new TextEncoder().encode(
    process.env.NEXTAUTH_SECRET ?? "dev-admin-secret",
  );
}

export async function createAdminToken(payload: { email: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(getSecret());
}

export async function verifyAdminToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret());
  return payload;
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;

  if (!token) return null;

  try {
    return await verifyAdminToken(token);
  } catch {
    return null;
  }
}

export const adminCookieName = ADMIN_COOKIE;
