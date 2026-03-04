import { EntityKind } from '../domain/types';

export function listKinds() {
  return Object.values(EntityKind);
}
