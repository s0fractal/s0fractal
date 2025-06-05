// Ctrl/CMD+. to cache dependencies on imports hover.

// Deno uses "npm:" prefix to import from npm (https://deno.land/manual@v1.36.3/node/npm_specifiers)
// import * as wmill from "npm:windmill-client@1.494.0"

// fill the type, or use the +Resource type to get a type-safe reference to a resource
// type Postgresql = object
import * as wmill from "npm:windmill-client";

export async function main() {
  const mcp_url = await wmill.getVariable("f/secrets/MCP_URL");
  console.log("✅ MCP URL:", mcp_url);
  // Далі можеш тут викликати MCP loop або ping
}
