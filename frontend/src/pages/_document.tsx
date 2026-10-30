import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/product-sans" />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/google-sans" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
