import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => (
  <Html translate="no">
    <Head>
      {/* <script
        crossOrigin="anonymous"
        src="//unpkg.com/react-scan/dist/auto.global.js"
      /> */}
      <link rel="icon" type="images/svg+xml" href="/favicon.svg" />
      <meta name="google" content="notranslate" />
      <script src="/__ENV.js" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
