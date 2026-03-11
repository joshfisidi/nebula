import dynamic from "next/dynamic";
import Script from "next/script";

const UniverseFlowScene = dynamic(
  () => import("@/universe/UniverseFlowScene").then((module) => module.UniverseFlowScene),
  { ssr: false }
);

export default function ControlRoomPreviewPage() {
  return (
    <main>
      <Script src="https://mcp.figma.com/mcp/html-to-design/capture.js" strategy="afterInteractive" />
      <UniverseFlowScene preview />
    </main>
  );
}
