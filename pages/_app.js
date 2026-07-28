import Head from "next/head";

import Layout from "../components/layout/layout";
import "../styles/global.css";

// Root component that wraps every page
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        {/* Default metadata for the application */}
        <title>Next Events</title>
        <meta name="description" content="NextJS Events" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* Render the current page */}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
