import Head from 'next/head';

type Props = {
  title?: string;
};

export default function MetaTags({ title = 'mannys.game' }: Props) {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=0.6, maximum-scale=1.0, user-scalable=0"
      />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="mannys.game is a browser based 3D NFT video game manifesting across the Ethereum blockchain."
      />
      <link rel="apple-touch-icon" href="/logo192.png" />
      <link rel="manifest" href="/manifest.json" />

      <title>{title}</title>
      <meta property="og:title" content="mannys.game" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mannys.game" />
      <meta property="og:image" content="https://mannys.game/logo512.png" />
      <meta
        property="og:description"
        content="mannys.game is a browser based 3D NFT video game manifesting across the Ethereum blockchain."
      />
      <meta name="twitter:title" content="mannys.game" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:description"
        content="mannys.game is a browser based 3D NFT video game manifesting across the Ethereum blockchain."
      />
      <meta name="twitter:image" content="https://mannys.game/logo512.png" />
      <meta name="twitter:site" content="@mannynotfound" />
      <base href="/" />
    </Head>
  );
}
