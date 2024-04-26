import { Env } from "../env";
import { deleteCookie } from "kukkii";

export const onRequest: PagesFunction<Env> = async (c) => {
  const { origin } = new URL(c.request.url);

  const response = new Response(undefined, {
    status: 302,
  });

  deleteCookie(response.headers, "access_token");
  deleteCookie(response.headers, "refresh_token");

  response.headers.set("Location", `${origin}/`);

  return response;
};
