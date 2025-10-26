import { Env } from "../env";
import { getSealedCookie } from "kukkii";

type AnimeListPage = {
  data?: unknown[];
  paging?: {
    next?: string;
  };
};

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

  const headers = {
    Authorization: `Bearer ${access_token}`,
  } as const;

  const entries: unknown[] = [];
  let nextUrl: string | undefined = url.toString();

  while (nextUrl) {
    const res = await fetch(nextUrl, { headers });
    if (!res.ok) {
      const errorText = await res.text();
      return new Response(errorText || "Failed to fetch animelist", {
        status: res.status,
        headers: {
          "content-type": res.headers.get("content-type") ?? "text/plain",
        },
      });
    }

    const page = (await res.json()) as AnimeListPage;
    if (Array.isArray(page?.data)) {
      entries.push(...page.data);
    }

    const next = page?.paging?.next;
    nextUrl = typeof next === "string" && next.length > 0 ? next : undefined;
  }

  return new Response(JSON.stringify(entries), {
    headers: {
      "content-type": "application/json",
    },
  });
};
