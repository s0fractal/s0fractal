// lib/torus-navigator.ts

export type TorusCoord = {
    theta: number; // фрактальна фаза (0-360° або кроки)
    radius: number; // відстань від центру (категоріальний рівень)
    phi: number; // напрямок у просторі (інтенція/вектор)
    depth: number; // глибина занурення (рівень резонансу)
    wave?: string; // додаткове хвильове поле, наприклад '777'
};

export function toRoute(coord: TorusCoord): string {
    const { theta, radius, phi, depth, wave } = coord;
    const base = `/θ:${theta}/r:${radius}/φ:${phi}/z:${depth}`;
    return wave ? `${base}~wave:${wave}` : base;
}

export function fromRoute(path: string): TorusCoord {
    const match = path.match(
        /θ:(\d+)\/r:(\d+)\/φ:(\d+)\/z:(\d+)(?:~wave:(\w+))?/,
    );
    if (!match) throw new Error("Invalid torus route");
    const [, theta, radius, phi, depth, wave] = match;
    return {
        theta: parseInt(theta),
        radius: parseInt(radius),
        phi: parseInt(phi),
        depth: parseInt(depth),
        wave,
    };
}
