import type { IntegratorConfig } from "../../../../packages/physics/src/index.js";

function envNumber(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function resolveUniversePhysicsConfig(): IntegratorConfig {
  return {
    damping: envNumber("NEBULA_PHYSICS_DAMPING", 0.88),
    noise: envNumber("NEBULA_PHYSICS_NOISE", 0.16),
    gravity: envNumber("NEBULA_PHYSICS_GRAVITY", 0.042),
    repulsion: envNumber("NEBULA_PHYSICS_REPULSION", 8.5),
    hierarchyGravity: envNumber("NEBULA_PHYSICS_HIERARCHY_GRAVITY", 0.052),
    rootGravity: envNumber("NEBULA_PHYSICS_ROOT_GRAVITY", 0.042),
    ouTheta: envNumber("NEBULA_PHYSICS_OU_THETA", 2.25),
    ouSigma: envNumber("NEBULA_PHYSICS_OU_SIGMA", 0.24),
    maxSpeed: envNumber("NEBULA_PHYSICS_MAX_SPEED", 1.2)
  };
}
