export interface SpringConstraint {
  a: number;
  b: number;
  restLength: number;
  stiffness: number;
}

export interface IntegratorConfig {
  damping: number;
  noise: number;
  gravity: number;
}

export interface IntegratorContext {
  nodeCount: number;
  positions: Float32Array;
  previousPositions: Float32Array;
  accelerations: Float32Array;
  constraints: SpringConstraint[];
  centers: Float32Array;
  dt: number;
  config: IntegratorConfig;
}

const EPSILON = 0.000001;

function vecOffset(index: number): number {
  return index * 3;
}

export function applySpringConstraints(ctx: IntegratorContext): void {
  const { constraints, positions } = ctx;

  for (const c of constraints) {
    const a = vecOffset(c.a);
    const b = vecOffset(c.b);

    const dx = positions[b] - positions[a];
    const dy = positions[b + 1] - positions[a + 1];
    const dz = positions[b + 2] - positions[a + 2];

    const dist = Math.max(EPSILON, Math.sqrt(dx * dx + dy * dy + dz * dz));
    const stretch = dist - c.restLength;
    const force = -c.stiffness * stretch;

    const nx = dx / dist;
    const ny = dy / dist;
    const nz = dz / dist;

    const fx = nx * force;
    const fy = ny * force;
    const fz = nz * force;

    ctx.accelerations[a] += fx;
    ctx.accelerations[a + 1] += fy;
    ctx.accelerations[a + 2] += fz;

    ctx.accelerations[b] -= fx;
    ctx.accelerations[b + 1] -= fy;
    ctx.accelerations[b + 2] -= fz;
  }
}

export function applyCentralGravity(ctx: IntegratorContext): void {
  const { nodeCount, positions, accelerations, centers, config } = ctx;

  for (let i = 0; i < nodeCount; i += 1) {
    const o = vecOffset(i);

    const gx = centers[o] - positions[o];
    const gy = centers[o + 1] - positions[o + 1];
    const gz = centers[o + 2] - positions[o + 2];

    accelerations[o] += gx * config.gravity;
    accelerations[o + 1] += gy * config.gravity;
    accelerations[o + 2] += gz * config.gravity;
  }
}

export function applyNoiseDrift(ctx: IntegratorContext, time: number): void {
  const { nodeCount, accelerations, config } = ctx;

  for (let i = 0; i < nodeCount; i += 1) {
    const o = vecOffset(i);
    const phase = time * 0.7 + i * 0.13;

    accelerations[o] += Math.sin(phase) * config.noise;
    accelerations[o + 1] += Math.cos(phase * 1.3) * config.noise;
    accelerations[o + 2] += Math.sin(phase * 0.9) * config.noise;
  }
}

export function integrateVerlet(ctx: IntegratorContext): void {
  const { nodeCount, positions, previousPositions, accelerations, dt, config } = ctx;
  const dt2 = dt * dt;

  for (let i = 0; i < nodeCount; i += 1) {
    const o = vecOffset(i);

    const cx = positions[o];
    const cy = positions[o + 1];
    const cz = positions[o + 2];

    const px = previousPositions[o];
    const py = previousPositions[o + 1];
    const pz = previousPositions[o + 2];

    const vx = (cx - px) * config.damping;
    const vy = (cy - py) * config.damping;
    const vz = (cz - pz) * config.damping;

    previousPositions[o] = cx;
    previousPositions[o + 1] = cy;
    previousPositions[o + 2] = cz;

    positions[o] = cx + vx + accelerations[o] * dt2;
    positions[o + 1] = cy + vy + accelerations[o + 1] * dt2;
    positions[o + 2] = cz + vz + accelerations[o + 2] * dt2;

    accelerations[o] = 0;
    accelerations[o + 1] = 0;
    accelerations[o + 2] = 0;
  }
}
