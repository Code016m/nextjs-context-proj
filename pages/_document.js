import Document, { Html, Head, Main, NextScript } from "next/document";

// Customize the HTML document structure
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          {/* Portal container for modals */}
          <div id="overlays" />

          {/* Render the application */}
          <Main />

          {/* Load Next.js scripts */}
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
