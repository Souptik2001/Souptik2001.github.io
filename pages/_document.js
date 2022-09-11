import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="Read quality technology blogs" />
        <meta name="application-name" content="@Souptik" />
        <link rel="icon" href="/icon.webp" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}