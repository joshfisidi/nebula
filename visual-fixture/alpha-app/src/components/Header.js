import { clamp } from '../lib/math';

export function Header(value) {
  return `Header:${clamp(value, 0, 100)}`;
}
