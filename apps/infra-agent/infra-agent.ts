import { canAccess } from "@/torus-permission";
import torusMap from "@/torus-map.yaml";

const agentId = "infra-agent";
const coord = torusMap[agentId];

export async function handleCommand(cmd: string, params: any) {
    const allowed = canAccess(agentId, { wave: "deploy", ...coord, depth: 1 });

    if (!allowed) {
        console.log("❌ Access denied");
        return { status: "denied", agent: agentId };
    }

    if (cmd === "deploy") {
        const app = params.app ?? "unknown";
        console.log(`🚀 Агент [${agentId}] активує deploy → ${app}`);
        return {
            status: "executed",
            agent: agentId,
            wave: "deploy",
            output: `Deployment triggered for ${app}`,
        };
    }

    return { status: "unknown_cmd", agent: agentId };
}
