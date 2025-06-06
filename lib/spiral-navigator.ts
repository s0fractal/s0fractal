// lib/spiral-navigator.ts

import type { TimeCell } from "../data/resonance-index.json";

export function getSpiralPosition(cell: TimeCell, config = defaultConfig) {
    const angle = config.angleStep * cell.theta;
    const radius = config.scale * cell.radius;
    return {
        x: config.centerX + radius * Math.cos(angle),
        y: config.centerY + radius * Math.sin(angle),
    };
}

export const defaultConfig = {
    centerX: 500,
    centerY: 500,
    scale: 20,
    angleStep: Math.PI / 15,
};
