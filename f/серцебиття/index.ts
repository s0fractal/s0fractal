// f/серцебиття/index.ts
import { runHeartbeat } from "./logic.ts";

export const name = "серцебиття";
export const cron = "*/1 * * * *"; // раз на хвилину

export async function run(args: { debug?: boolean }) {
  await runHeartbeat(args.debug ?? false);
}