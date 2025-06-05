import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(() => new Response("WhisperNode active — listening..."), {
  port: parseInt(Deno.env.get("PORT") ?? "8080")
});
