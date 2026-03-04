import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

export function home() {
  return `${Header(42)}|${Sidebar()}`;
}
