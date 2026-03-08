import type { IntegratorConfig } from "../../../../packages/physics/src/index.js";

function envNumber(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function resolveUniversePhysicsConfig(): IntegratorConfig {
  return {
    damping: envNumber("NEBULA_PHYSICS_DAMPING", 0.84),
    noise: envNumber("NEBULA_PHYSICS_NOISE", 0.48),
    gravity: envNumber("NEBULA_PHYSICS_GRAVITY", 0.024),
    repulsion: envNumber("NEBULA_PHYSICS_REPULSION", 8.5),
    hierarchyGravity: envNumber("NEBULA_PHYSICS_HIERARCHY_GRAVITY", 0.036),
    rootGravity: envNumber("NEBULA_PHYSICS_ROOT_GRAVITY", 0.03),
    ouTheta: envNumber("NEBULA_PHYSICS_OU_THETA", 1.8),
    ouSigma: envNumber("NEBULA_PHYSICS_OU_SIGMA", 0.72),
    maxSpeed: envNumber("NEBULA_PHYSICS_MAX_SPEED", 2.8)
  };
}
