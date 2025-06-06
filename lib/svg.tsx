import React from "react";
import { useRouter } from "next/router";
import { defaultConfig, getSpiralPosition } from "../lib/spiral-navigator";
import { toRoute } from "../lib/torus-navigator";
import resonanceData from "../data/resonance-index.json";

// Типізація, якщо resonance-index.json не має export default
type TimeCell = {
    id: string;
    timestamp: string;
    theta: number;
    radius: number;
    ref?: string;
    wave?: string;
};

const SpiralSVG: React.FC = () => {
    const cells = resonanceData as TimeCell[];
    const router = useRouter();

    const handleZoom = (cell: TimeCell) => {
        const route = toRoute({
            theta: cell.theta,
            radius: cell.radius,
            phi: 0, // Поки умовно, можна зробити wave -> phi або ref -> phi
            depth: 0,
            wave: cell.wave,
        });
        router.push(route);
    };

    const getColorByWave = (wave?: string) => {
        if (!wave) return "#00ffff";
        const hash = wave.split("").reduce(
            (acc, char) => acc + char.charCodeAt(0),
            0,
        );
        return `hsl(${hash % 360}, 80%, 60%)`;
    };

    return (
        <svg
            width="1000"
            height="1000"
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
            style={{ background: "#111" }}
        >
            {cells.map((cell) => {
                const { x, y } = getSpiralPosition(cell, defaultConfig);
                return (
                    <circle
                        key={cell.id}
                        cx={x}
                        cy={y}
                        r={6}
                        fill={getColorByWave(cell.wave)}
                        stroke="#fff"
                        strokeWidth={cell.wave ? 1.5 : 0.5}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleZoom(cell)}
                    >
                        <title>
                            {`${cell.id}\n${cell.timestamp}\nWave: ${
                                cell.wave || "none"
                            }`}
                        </title>
                    </circle>
                );
            })}
        </svg>
    );
};

export default SpiralSVG;
