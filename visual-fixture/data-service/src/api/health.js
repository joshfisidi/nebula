import { listKinds } from '../storage/repo';

export function health() {
  return { status: 'ok', kinds: listKinds() };
}
