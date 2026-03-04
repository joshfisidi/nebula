import dynamic from "next/dynamic";

const UniverseFlatScene = dynamic(
  () => import("@/universe/UniverseFlatScene").then((module) => module.UniverseFlatScene),
  { ssr: false }
);

export default function HomePage() {
  return (
    <main>
      <UniverseFlatScene />
    </main>
  );
}
