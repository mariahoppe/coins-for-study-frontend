import dynamic from "next/dynamic";

const CoinsForStudyApp = dynamic(() => import("../src/features/coins/CoinsForStudyApp"), { ssr: false });

export default function Home() {
  return <CoinsForStudyApp />;
}
