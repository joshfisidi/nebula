import dynamic from "next/dynamic";

const UniverseScene = dynamic(
  () => import("@/universe/UniverseScene").then((module) => module.UniverseScene),
  { ssr: false }
);

export default function HomePage() {
  return (
    <main>
      <UniverseScene />
    </main>
  );
}
