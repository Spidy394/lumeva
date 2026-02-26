import { auth } from "../../config/auth";
import { fromNodeHeaders } from "better-auth/node";
import type { IncomingHttpHeaders } from "http";

export async function register(email: string, password: string, name: string) {
  const result = await auth.api.signUpEmail({
    body: { email, password, name },
  });
  return result;
}

export async function login(
  email: string,
  password: string,
  nodeHeaders: IncomingHttpHeaders
) {
  const response = await auth.api.signInEmail({
    body: { email, password },
    headers: fromNodeHeaders(nodeHeaders),
    asResponse: true,
  });
  return response;
}

export async function logout(nodeHeaders: IncomingHttpHeaders) {
  const response = await auth.api.signOut({
    headers: fromNodeHeaders(nodeHeaders),
    asResponse: true,
  });
  return response;
}

export async function getSession(nodeHeaders: IncomingHttpHeaders) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(nodeHeaders),
  });
  return session;
}
