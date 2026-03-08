export interface SpringConstraint {
  a: number;
  b: number;
  restLength: number;
  stiffness: number;
}

export interface NodePhysicsMeta {
  mass: number;
  charge: number;
  restLengthScale: number;
  stiffnessScale: number;
  volatility: number;
  salience: number;
  subtreeMass: number;
  depth: number;
  collisionRadius: number;
  anchorRadius: number;
}

export interface IntegratorConfig {
  damping: number;
  noise: number;
  gravity: number;
  repulsion: number;
  hierarchyGravity: number;
  rootGravity: number;
  ouTheta: number;
  ouSigma: number;
  maxSpeed: number;
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
  masses?: Float32Array;
  charges?: Float32Array;
  volatility?: Float32Array;
  salience?: Float32Array;
  subtreeMass?: Float32Array;
  depths?: Float32Array;
  ouVelocity?: Float32Array;
  collisionRadii?: Float32Array;
  anchorRadii?: Float32Array;
}

const EPSILON = 0.000001;

function vecOffset(index: number): number {
  return index * 3;
}

function scalarAt(values: Float32Array | undefined, index: number, fallback: number): number {
  return values ? values[index] ?? fallback : fallback;
}

function hashNoise(seed: number): number {
  const v = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return v - Math.floor(v);
}

function applyForce(ctx: IntegratorContext, index: number, fx: number, fy: number, fz: number): void {
  const o = vecOffset(index);
  const mass = Math.max(EPSILON, scalarAt(ctx.masses, index, 1));

  ctx.accelerations[o] += fx / mass;
  ctx.accelerations[o + 1] += fy / mass;
  ctx.accelerations[o + 2] += fz / mass;
}

function translateBody(
  positions: Float32Array,
  previousPositions: Float32Array,
  index: number,
  tx: number,
  ty: number,
  tz: number
): void {
  const o = vecOffset(index);
  positions[o] += tx;
  positions[o + 1] += ty;
  positions[o + 2] += tz;
  previousPositions[o] += tx;
  previousPositions[o + 1] += ty;
  previousPositions[o + 2] += tz;
}

export function applySemanticSpringConstraints(ctx: IntegratorContext): void {
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

    applyForce(ctx, c.a, fx, fy, fz);
    applyForce(ctx, c.b, -fx, -fy, -fz);
  }
}

export function applySpringConstraints(ctx: IntegratorContext): void {
  applySemanticSpringConstraints(ctx);
}

export function applyChargeRepulsion(ctx: IntegratorContext): void {
  const { nodeCount, positions, config } = ctx;

  for (let i = 0; i < nodeCount; i += 1) {
    const a = vecOffset(i);
    for (let j = i + 1; j < nodeCount; j += 1) {
      const b = vecOffset(j);
      const dx = positions[b] - positions[a];
      const dy = positions[b + 1] - positions[a + 1];
      const dz = positions[b + 2] - positions[a + 2];

      const distSq = dx * dx + dy * dy + dz * dz + EPSILON;
      const dist = Math.sqrt(distSq);
      const charge = scalarAt(ctx.charges, i, 1) * scalarAt(ctx.charges, j, 1);
      const force = (config.repulsion * charge) / distSq;

      const nx = dx / dist;
      const ny = dy / dist;
      const nz = dz / dist;

      applyForce(ctx, i, -nx * force, -ny * force, -nz * force);
      applyForce(ctx, j, nx * force, ny * force, nz * force);
    }
  }
}

export function solveCollisionConstraints(ctx: IntegratorContext, iterations = 2): void {
  const { nodeCount, positions, previousPositions } = ctx;

  for (let iter = 0; iter < iterations; iter += 1) {
    for (let i = 0; i < nodeCount; i += 1) {
      const a = vecOffset(i);
      const radiusA = scalarAt(ctx.collisionRadii, i, 0);
      if (radiusA <= 0) continue;

      for (let j = i + 1; j < nodeCount; j += 1) {
        const b = vecOffset(j);
        const radiusB = scalarAt(ctx.collisionRadii, j, 0);
        if (radiusB <= 0) continue;

        let dx = positions[b] - positions[a];
        let dy = positions[b + 1] - positions[a + 1];
        let dz = positions[b + 2] - positions[a + 2];
        let distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < EPSILON) {
          dx = hashNoise(i * 131 + j * 17 + iter + 1) * 2 - 1;
          dy = hashNoise(i * 151 + j * 19 + iter + 2) * 2 - 1;
          dz = hashNoise(i * 173 + j * 23 + iter + 3) * 2 - 1;
          distSq = dx * dx + dy * dy + dz * dz + EPSILON;
        }

        const minDist = radiusA + radiusB;
        if (distSq >= minDist * minDist) continue;

        const dist = Math.sqrt(Math.max(EPSILON, distSq));
        const overlap = minDist - dist;
        if (overlap <= 0) continue;

        const nx = dx / dist;
        const ny = dy / dist;
        const nz = dz / dist;
        const invMassA = 1 / Math.max(EPSILON, scalarAt(ctx.masses, i, 1));
        const invMassB = 1 / Math.max(EPSILON, scalarAt(ctx.masses, j, 1));
        const invMassTotal = invMassA + invMassB;
        if (invMassTotal <= EPSILON) continue;

        const pushA = overlap * (invMassA / invMassTotal);
        const pushB = overlap * (invMassB / invMassTotal);

        translateBody(positions, previousPositions, i, -nx * pushA, -ny * pushA, -nz * pushA);
        translateBody(positions, previousPositions, j, nx * pushB, ny * pushB, nz * pushB);
      }
    }
  }
}

export function applyCentralGravity(ctx: IntegratorContext): void {
  const { nodeCount, positions, accelerations, centers, config } = ctx;

  for (let i = 0; i < nodeCount; i += 1) {
    const o = vecOffset(i);

    const gx = centers[o] - positions[o];
    const gy = centers[o + 1] - positions[o + 1];
    const gz = centers[o + 2] - positions[o + 2];

    const salience = scalarAt(ctx.salience, i, 1);
    const force = config.gravity * (0.7 + salience * 0.3);

    accelerations[o] += gx * force;
    accelerations[o + 1] += gy * force;
    accelerations[o + 2] += gz * force;
  }
}

export function applyHierarchyGravity(ctx: IntegratorContext): void {
  const { nodeCount, positions, centers, config } = ctx;
  const rootCenterX = centers[0] ?? 0;
  const rootCenterY = centers[1] ?? 0;
  const rootCenterZ = centers[2] ?? 0;

  for (let i = 0; i < nodeCount; i += 1) {
    const o = vecOffset(i);
    const depth = scalarAt(ctx.depths, i, 0);
    const subtreeMass = scalarAt(ctx.subtreeMass, i, 1);
    const depthForce = config.hierarchyGravity * (1 + depth * 0.12);
    const semanticLift = 1 + Math.min(2.5, subtreeMass * 0.08);

    const cx = centers[o] - positions[o];
    const cy = centers[o + 1] - positions[o + 1];
    const cz = centers[o + 2] - positions[o + 2];

    const rx = rootCenterX - positions[o];
    const ry = rootCenterY - positions[o + 1];
    const rz = rootCenterZ - positions[o + 2];

    applyForce(ctx, i, cx * depthForce * semanticLift, cy * depthForce, cz * depthForce);
    applyForce(
      ctx,
      i,
      rx * config.rootGravity * depth * 0.25,
      ry * config.rootGravity * depth * 0.25,
      rz * config.rootGravity * depth * 0.18
    );
  }
}

export function applyOrnsteinUhlenbeckDrift(ctx: IntegratorContext, time: number): void {
  const { nodeCount, accelerations, positions, centers, config } = ctx;
  const ouVelocity = ctx.ouVelocity ?? new Float32Array(nodeCount * 3);
  const sqrtDt = Math.sqrt(Math.max(ctx.dt, EPSILON));

  for (let i = 0; i < nodeCount; i += 1) {
    const o = vecOffset(i);
    const volatility = scalarAt(ctx.volatility, i, 1);
    const salience = scalarAt(ctx.salience, i, 1);
    const muX = (centers[o] - positions[o]) * 0.03 * salience;
    const muY = (centers[o + 1] - positions[o + 1]) * 0.03 * salience;
    const muZ = (centers[o + 2] - positions[o + 2]) * 0.02 * salience;

    const theta = config.ouTheta * (0.7 + salience * 0.3);
    const sigma = config.ouSigma * volatility;
    const noiseX = (hashNoise(time * 97 + i * 13.1 + 1) * 2 - 1) * sigma * sqrtDt;
    const noiseY = (hashNoise(time * 101 + i * 17.7 + 2) * 2 - 1) * sigma * sqrtDt;
    const noiseZ = (hashNoise(time * 89 + i * 19.3 + 3) * 2 - 1) * sigma * sqrtDt;

    ouVelocity[o] += theta * (muX - ouVelocity[o]) * ctx.dt + noiseX;
    ouVelocity[o + 1] += theta * (muY - ouVelocity[o + 1]) * ctx.dt + noiseY;
    ouVelocity[o + 2] += theta * (muZ - ouVelocity[o + 2]) * ctx.dt + noiseZ;

    accelerations[o] += ouVelocity[o] * config.noise;
    accelerations[o + 1] += ouVelocity[o + 1] * config.noise;
    accelerations[o + 2] += ouVelocity[o + 2] * config.noise;
  }
}

export function applyNoiseDrift(ctx: IntegratorContext, time: number): void {
  applyOrnsteinUhlenbeckDrift(ctx, time);
}

export function integrateVerlet(ctx: IntegratorContext): void {
  const { nodeCount, positions, previousPositions, accelerations, dt, config } = ctx;
  const dt2 = dt * dt;
  const maxSpeed = Math.max(EPSILON, config.maxSpeed);

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
    const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);
    const clamp = speed > maxSpeed ? maxSpeed / speed : 1;

    previousPositions[o] = cx;
    previousPositions[o + 1] = cy;
    previousPositions[o + 2] = cz;

    positions[o] = cx + vx * clamp + accelerations[o] * dt2;
    positions[o + 1] = cy + vy * clamp + accelerations[o + 1] * dt2;
    positions[o + 2] = cz + vz * clamp + accelerations[o + 2] * dt2;

    accelerations[o] = 0;
    accelerations[o + 1] = 0;
    accelerations[o + 2] = 0;
  }
}

export function constrainToAnchors(ctx: IntegratorContext): void {
  const { nodeCount, positions, previousPositions, centers } = ctx;

  for (let i = 0; i < nodeCount; i += 1) {
    const maxOffset = scalarAt(ctx.anchorRadii, i, 0);
    if (maxOffset <= 0) continue;

    const o = vecOffset(i);
    const dx = positions[o] - centers[o];
    const dy = positions[o + 1] - centers[o + 1];
    const dz = positions[o + 2] - centers[o + 2];
    const distSq = dx * dx + dy * dy + dz * dz;

    if (distSq <= maxOffset * maxOffset) continue;

    const dist = Math.sqrt(Math.max(EPSILON, distSq));
    const scale = maxOffset / dist;
    const nextX = centers[o] + dx * scale;
    const nextY = centers[o + 1] + dy * scale;
    const nextZ = centers[o + 2] + dz * scale;
    const tx = nextX - positions[o];
    const ty = nextY - positions[o + 1];
    const tz = nextZ - positions[o + 2];

    translateBody(positions, previousPositions, i, tx, ty, tz);
  }
}

export function stepHybridGraphField(ctx: IntegratorContext, time: number): void {
  applySemanticSpringConstraints(ctx);
  applyChargeRepulsion(ctx);
  applyCentralGravity(ctx);
  applyHierarchyGravity(ctx);
  applyOrnsteinUhlenbeckDrift(ctx, time);
  integrateVerlet(ctx);
  constrainToAnchors(ctx);
  solveCollisionConstraints(ctx);
}
