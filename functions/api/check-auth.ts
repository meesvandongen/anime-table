import { Env } from "../env";
import { getSealedCookie } from "kukkii";

export const onRequest: PagesFunction<Env> = async (c) => {
  const access_token = await getSealedCookie(
    c.request.headers,
    c.env.COOKIE_SECRET,
    "access_token",
  );
  if (!access_token) {
    return new Response("No access_token provided", { status: 400 });
  }

  return new Response(undefined, {
    status: 204,
  });
};
