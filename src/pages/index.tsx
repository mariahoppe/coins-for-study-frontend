import dynamic from "next/dynamic";
import Head from "next/head";

const CoinsForStudyApp = dynamic(
  () => import("@/features/coins/CoinsForStudyApp"),
  { ssr: false }
);

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Coins for Study</title>
        <meta name="description" content="Plataforma que recompensa o aprendizado" />
      </Head>
      <CoinsForStudyApp />
    </>
  );
}
