import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <main>
        <h1 className="h1 text-center">This is the home page</h1>
      </main>
    </>
  );
}
