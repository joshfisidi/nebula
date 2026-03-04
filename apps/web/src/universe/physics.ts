import * as THREE from "three";
import type { NodeType } from "@nebula/protocol";

export const PHYSICS_DEFAULTS = {
  springK: 0.015,
  damping: 0.92,
  noise: 0.0018,
  gravity: 0.013,
  parentRest: 4.8,
  importRest: 8.4
} as const;

export function hashToUnit(input: string): number {
  let hash = 2166136261;

  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }

  return (hash >>> 0) / 4294967295;
}

export function typeToValue(type: NodeType): number {
  if (type === "PROJECT") return 0;
  if (type === "FOLDER") return 1;
  return 2;
}

export function projectCenterFromSlot(slot: number): [number, number, number] {
  if (slot === 0) {
    return [0, 0, 0];
  }

  const adjusted = slot - 1;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const ring = Math.floor(adjusted / 6) + 1;
  const angle = adjusted * golden;
  const radius = 34 + ring * 24;
  const x = Math.cos(angle) * radius;
  const y = ((adjusted % 7) - 3) * 6;
  const z = Math.sin(angle) * radius;

  return [x, y, z];
}

interface EdgeCurveOptions {
  type: "PARENT" | "IMPORT";
  fromDepth: number;
  toDepth: number;
}

export function computeEdgeControlPoint(
  from: THREE.Vector3,
  to: THREE.Vector3,
  center: THREE.Vector3,
  time: number,
  seed: number,
  options: EdgeCurveOptions,
  out: THREE.Vector3
): THREE.Vector3 {
  out.copy(from).lerp(to, 0.5);

  const dir = _tmpA.copy(to).sub(from);
  const len = Math.max(0.0001, dir.length());
  dir.multiplyScalar(1 / len);

  const radial = _tmpB.copy(out).sub(center);
  if (radial.lengthSq() < 0.000001) {
    radial.set(0, 1, 0);
  } else {
    radial.normalize();
  }

  const side = _tmpC.crossVectors(dir, radial);
  if (side.lengthSq() < 0.000001) {
    side.set(-dir.z, 0.18, dir.x);
  }
  side.normalize();

  const meanDepth = (options.fromDepth + options.toDepth) * 0.5;
  const depthWeight = Math.min(1.3, 0.2 + meanDepth * 0.17);
  const typeWeight = options.type === "PARENT" ? 0.28 : 0.44;
  const baseAmplitude = Math.min(18, len * (0.1 + typeWeight)) * depthWeight;
  const phase = time * (0.2 + (options.type === "PARENT" ? 0.03 : 0.05)) + seed * 19.7;
  const wobble = 0.9 + Math.sin(phase) * 0.08;
  const arcAmplitude = baseAmplitude * wobble;

  out.addScaledVector(radial, arcAmplitude * 0.65);
  out.addScaledVector(side, arcAmplitude * ((seed - 0.5) * 0.55));

  return out;
}

export function sampleQuadraticBezier(
  from: THREE.Vector3,
  control: THREE.Vector3,
  to: THREE.Vector3,
  t: number,
  out: THREE.Vector3
): THREE.Vector3 {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;

  out.set(
    uu * from.x + 2 * u * t * control.x + tt * to.x,
    uu * from.y + 2 * u * t * control.y + tt * to.y,
    uu * from.z + 2 * u * t * control.z + tt * to.z
  );

  return out;
}

const _tmpA = new THREE.Vector3();
const _tmpB = new THREE.Vector3();
const _tmpC = new THREE.Vector3();
