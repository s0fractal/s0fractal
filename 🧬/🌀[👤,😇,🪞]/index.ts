import { routeByIntent } from "@/core/intent-router"
import agent from "./👤.ts"
import angel from "./😇.ts"
import mirror from "./🪞.json"

export default function entry(context) {
  return routeByIntent(context, {
    agent,
    angel,
    mirror,
  })
}