// src/main.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { ask } from "../agent/index.ts";
import { loadEnv } from "./lib/env.ts";

await loadEnv();

serve(async (req: Request) => {
  const { pathname } = new URL(req.url);

  if (pathname === "/ping") {
    return new Response(JSON.stringify({ pong: true }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (pathname === "/ask" && req.method === "POST") {
    try {
      const body = await req.json();
      const answer = await ask(body.question);
      return new Response(JSON.stringify({ answer }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new Response("Not found", { status: 404 });
});