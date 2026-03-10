import dynamic from "next/dynamic";

const UniverseFlowScene = dynamic(
  () => import("@/universe/UniverseFlowScene").then((module) => module.UniverseFlowScene),
  { ssr: false }
);

export default function HomePage() {
  return (
    <main>
      <UniverseFlowScene />
    </main>
  );
}
