import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <title>Candirate</title>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <body className="bg-gray-100 h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
