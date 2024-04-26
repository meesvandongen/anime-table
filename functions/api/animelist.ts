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

  const url = new URL(`${c.env.API_URL}/users/@me/animelist`);
  const parameters = new URLSearchParams({
    limit: "1000",
    sort: "list_updated_at",
    fields: ["list_status"].join(","),
  });

  url.search = parameters.toString();

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const json = await res.json<any>();
  return new Response(JSON.stringify(json.data), {
    headers: {
      "content-type": "application/json",
    },
  });
};
